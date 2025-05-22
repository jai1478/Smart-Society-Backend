const express = require('express');
const router = express.Router();
const { registerUser ,getUsers, getMobileNumber } = require('../controllers/registrationController');

router.post('/register', registerUser);
router.get("/users", getUsers);
router.post("/mobilenumber" ,getMobileNumber)
module.exports = router;
