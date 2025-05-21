const db = require('../config/db');

const createRegistration = async ({ userName, mobileNumber, emailAddress }) => {
  const [result] = await db.execute(
    'INSERT INTO registrations (userName, mobileNumber, emailAddress) VALUES (?, ?, ?)',
    [userName, mobileNumber, emailAddress]
  );
  return result.insertId;
};

const getAllRegistrations = async () => {
  const [rows] = await db.execute('SELECT * FROM registrations');
  return rows;
};

module.exports = {
  createRegistration,
  getAllRegistrations,
};
