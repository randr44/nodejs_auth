require("dotenv").config();
const mongoose = require("mongoose");

// uri
const { MONGODB_URI } = process.env;

const connectToDB = async () => {
    try {
        //comment
        const conn = await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

connectToDB();