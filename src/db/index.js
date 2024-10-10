import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://tanush:qwert@cluster0.qc99s.mongodb.net/${DB_NAME}`);
        console.log("Datbase connected || Database Host :", connectionInstance.connection.host);
    } catch (error) {
        console.error('MONG~ODB connection error', error);
        process.exit(1);

    }
}
export default connectDB;   mongoose