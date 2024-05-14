import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./dbConnection/dbConnection.js";
import { errorMiddleware } from "./utils/error.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

const app = express();
dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT || 3000;

dbConnection();

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.listen(port, () => {
  try {
    console.log(`Server is Listening on http://localhost:${port}`);
  } catch (error) {
    console.log("Server Couldn't be Started");
  }
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/listing", listingRoutes);

app.use(errorMiddleware);
