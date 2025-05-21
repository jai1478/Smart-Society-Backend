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

module.exports = {
  registerUser,
  getUsers,
};
