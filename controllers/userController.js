const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { userName, firstName, lastName,mobileNo, email, password } = req.body;

    if (!userName || !firstName || !lastName || !mobileNo || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertId = await Users.createUser({
      userName,
      firstName,
      lastName,
      mobileNo,
      email,
      password: hashedPassword,
      secretSalt: salt,
    });

    res.status(201).json({ message: 'User registered successfully', id: insertId });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await Users.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers:", error);
    res.status(500).json({ message: 'Server error', error: error.message || 'Unknown error' });
  }
};

module.exports = {
  registerUser,
  getUsers,
};
