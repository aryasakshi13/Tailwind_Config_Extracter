import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB} from './config/database';
import authRoutes from './routes/auth';
import extractorRoutes from './routes/extractor';
import cookieParser from 'cookie-parser';
import { userAuthGuard } from './middleware/authMiddleware';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000 ;

 const allowedOrigins = [
  'http://localhost:5173', // Alternative Vite local development port
  'http://localhost:5174', // 👈 Your current React webApp dashboard port!
];

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`📡 Server received a request: [${req.method}] to path: "${req.url}"`);
    next();
});
app.use((req, res, next) => {
    console.log(`\n🚨 CAMERA WATCHING: ${req.method} ${req.url}`);
    console.log(`Headers Auth:`, req.headers.authorization || "❌ NONE");
    console.log(`Cookies:`, req.cookies || "❌ NONE");
    next();
});
// app.post('/login', loginUser);


// app.use((req, _res, next) => {
//     console.log(`→ Incoming: ${req.method} ${req.url}`);
//     next();
// });

app.use('/api/auth', authRoutes);
// app.use('/extractor', userAuthGuard, extractorRoutes)

app.use('/extractor', extractorRoutes);

// app.post("/auth/login", (re,res)=>{

// })
 
// app.use((req, res) => {
//     console.log(`404: ${req.method} ${req.url}`);
//     res.status(404).json({ message: `Cannot ${req.method} ${req.url}` });
// });

console.log("\n--- Registered Routes ---");
authRoutes.stack.forEach((layer: any) => {
    if (layer.route) {
        const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
        console.log(`${methods} /auth${layer.route.path}`);
    }
});
// console.log("-------------------------\n");

const startServer = async () => {
    await connectDB();  // wait for DB first
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

import { loginUser, registerUser } from './controller/authController';
console.log('loginUser:', typeof loginUser);
console.log('registerUser:', typeof registerUser);

startServer();

// app.listen(PORT, ()=>{
//     console.log("server is succefully listen on POrt 5000");
// });