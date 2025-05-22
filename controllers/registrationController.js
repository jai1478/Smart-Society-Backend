const Registration = require('../models/registrationModel');

const registerUser = async (req, res) => {
  try {
    const { userName, mobileNumber, emailAddress } = req.body;

    if (!userName || !mobileNumber || !emailAddress) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const insertId = await Registration.createRegistration({
      userName,
      mobileNumber,
      emailAddress,
    });

    res.status(201).json({ message: 'Registration successful', id: insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Registration.getAllRegistrations();
    res.status(200).json(users);
  } catch (error) {
    console.error(" Error in getUsers:", error);
    res.status(500).json({ message: 'Server error', error: error.message || 'Unknown error' });
  }
};

const getMobileNumber = async (req, res) => {

  const { mobileNumber } = req.body;
  if (!mobileNumber) {
    return res.status(400).json({ message: 'Mobile number is required' });
  }
  
  try {
    const exists = await Registration.checkMobileNumber(mobileNumber);
    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  registerUser,
  getUsers,
  getMobileNumber
};
