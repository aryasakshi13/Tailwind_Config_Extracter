import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB} from './config/database';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000 ;

connectDB();

app.use(cors());
app.use(express.json());

app.listen(PORT, ()=>{
    console.log("server is succefully listen on POrt 5000")
});