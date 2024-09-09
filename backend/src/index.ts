import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import settingRoutes from "./routes/settingRoutes";
import cors from "cors";

dotenv.config();
connectDB();

const app: Application = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/api/v1", settingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
