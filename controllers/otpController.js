const db = require('../config/db'); // MySQL connection
const otpStore = require('../utils/otpStore');
require('dotenv').config();
const twilio = require('twilio');


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOtp = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ message: 'Mobile number is required' });
  }

  try {
    const [results] = await db.execute(
      'SELECT * FROM registrations WHERE mobileNumber = ?',
      [mobileNumber]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'Mobile number not registered' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in memory with 5 min expiry
    otpStore.set(mobileNumber, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    // Send OTP using Twilio
    await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${mobileNumber}`, // assumes Indian phone numbers
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP', error });
  }
};



exports.verifyOtp = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  const record = otpStore.get(mobileNumber);

  if (!record || record.otp !== otp) {
    return res.status(400).json({ message: 'Invalid or expired OTP', success: false });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobileNumber);
    return res.status(400).json({ message: 'OTP has expired', success: false });
  }

  // Optional: Update user as verified
  

  otpStore.delete(mobileNumber);

  res.json({ message: 'OTP verified successfully', success: true });
};

