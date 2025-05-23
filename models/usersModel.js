const db = require('../config/db'); // Make sure your DB connection is correctly imported

// Create a new user
const createUser = async ({ userName, firstName, lastName, email, password, secretSalt }) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO users (userName, firstName, lastName, email, password, secretSalt, isActive, createdBy, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [userName, firstName, lastName, email, password, secretSalt, true, 'system'] // Default isActive to true and createdBy to 'system'
    );
    return result.insertId;
  } catch (error) {
    console.error("Database error in createUser:", error);
    throw error;
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error("Database error in getAllUsers:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
