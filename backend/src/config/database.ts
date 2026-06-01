import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connection_url = process.env.MONGO_URI;

        if (!connection_url) {
            throw new Error("Mongo_URI is missing from environment configurations");
        }

        const connection = await mongoose.connect(connection_url);

        console.log("MongoDB Connected successfully");
        
    } catch (err:any) {
       
        console.error("Database connection failed ", err);

        process.exit(1);
    }
};