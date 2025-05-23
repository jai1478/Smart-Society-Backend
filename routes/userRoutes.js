const express =require("express");
const { registerUser, getUsers } = require("../controllers/userController");
const router = express.Router()

router.post('/userregister', registerUser);
router.get("/getusers", getUsers);

module.exports  = router