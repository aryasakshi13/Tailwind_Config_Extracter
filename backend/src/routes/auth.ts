// const express = require("express");
// const router = express.Router();
import {Router} from 'express';
import { loginUser, registerUser, getUserProfile} from '../controller/authController';
import { userAuthGuard } from '../middleware/authMiddleware';
 const router = Router();
 


router.post("/signup",registerUser);
router.post("/login", loginUser);
router.get('/profile', userAuthGuard, getUserProfile);


// module.exports = router;
export default router;