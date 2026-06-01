// const express = require("express");
// const router = express.Router();
import {Router} from 'express';
import { loginUser, registerUser } from '../controller/authController';
 const router = Router();
 

router.post("/login", loginUser);
router.post("/signup",registerUser);


// module.exports = router;
export default router;