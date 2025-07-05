const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const dbURI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Database connected!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

module.exports = connectDB; 
