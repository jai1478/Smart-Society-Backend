const db = require('../config/db'); // MySQL connection
const otpStore = require('../utils/otpStore');

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
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    res.json({ message: 'OTP sent successfully', otp }); // return OTP for testing
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};



exports.verifyOtp = (req, res) => {
  const { mobileNumber, otp } = req.body;

  const record = otpStore.get(mobileNumber);

  if (!record || record.otp !== otp) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobileNumber);
    return res.status(400).json({ message: 'OTP has expired' });
  }

  otpStore.delete(mobileNumber);
  res.json({ message: 'OTP verified successfully' });
};
