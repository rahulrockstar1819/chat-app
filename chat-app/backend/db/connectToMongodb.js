import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGO_DB_URI;
        if (!mongoURI) {
            throw new Error('MONGO_DB_URI is not defined in the environment variables');
        }
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectToMongoDB;

