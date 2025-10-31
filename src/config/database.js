import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.URI;

async function connectDB() {
	if (URI) await mongoose.connect(process.env.URI);
}

export default connectDB;
