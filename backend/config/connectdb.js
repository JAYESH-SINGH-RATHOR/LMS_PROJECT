
import mongoose from "mongoose";

const connectdb = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log("MongoDB URI:", process.env.MONGODB_URL);
        
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000 
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

export default connectdb;
