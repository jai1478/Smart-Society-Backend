const db = require('../config/db');

const createRegistration = async ({ userName, mobileNumber, emailAddress }) => {
  const [result] = await db.execute(
    'INSERT INTO registrations (userName, mobileNumber, emailAddress) VALUES (?, ?, ?)',
    [userName, mobileNumber, emailAddress]
  );
  return result.insertId;
};

const getAllRegistrations = async () => {
  try {
    const [rows] = await db.execute('SELECT * FROM registrations');
    return rows;
  } catch (error) {
    console.error("Database error in getAllRegistrations:", error);
    throw error; // let controller send error to client
  }
};

const checkMobileNumber = async (mobileNumber) => {
  try {
    const [result] = await db.execute(
      'SELECT * FROM registrations WHERE mobileNumber = ?',
      [mobileNumber]
    );
    return result.length > 0;
  } catch (error) {
    console.error("Database error in checkMobileNumber:", error);
    throw error;
  }
};


module.exports = {
  createRegistration,
  getAllRegistrations,
  checkMobileNumber
};
