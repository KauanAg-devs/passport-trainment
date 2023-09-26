import mongoose from "mongoose";
const connectDB = () => {
    return mongoose.connect('mongodb://localhost:27017/mydatabase')
}
    export default connectDB