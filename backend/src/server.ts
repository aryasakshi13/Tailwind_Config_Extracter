import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB} from './config/database';
import authRoutes from './routes/auth';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000 ;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/auth",authRoutes)
// app.post("/auth/login", (re,res)=>{

// })

app.listen(PORT, ()=>{
    console.log("server is succefully listen on POrt 5000")
});