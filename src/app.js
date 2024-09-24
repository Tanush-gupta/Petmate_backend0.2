import express from "express";
// import cors from 'cors';
// import cookieParser from "cookie-parser";
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

// app.use(cors({
//     origin: process.env.CORS_ORIGIN
// }));

// Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(cookieParser())

// Routes imports
import userRoutes from "./routes/user.routes.js";

// Routes declaration
app.use("/api/v1/users", userRoutes);

export { app };
