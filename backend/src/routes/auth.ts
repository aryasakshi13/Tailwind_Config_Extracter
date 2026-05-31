// const express = require("express");
// const router = express.Router();
import {Router} from 'express';
 const router = Router();
 
router.post("/signup",registerUser);


// module.exports = router;
export default router;