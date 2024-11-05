import express from "express";
import cors from "cors";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World from Petmate Backend");
});

app.use(cors());
// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(cookieParser())

// Routes imports
import userRoutes from "./routes/user.routes.js";
import petRoutes from "./routes/pet.routes.js";
import message from "./routes/message.routes.js";

// Routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/pet", petRoutes);
app.use("/api/v1/message", message);

export { app };
