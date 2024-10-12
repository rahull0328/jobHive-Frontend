import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log("Connected To MongoDB");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;