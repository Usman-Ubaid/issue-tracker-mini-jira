import express from "express";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import issueRoutes from "./routes/issueRoutes.js";

dotenv.config();
const app = express();

// middleware configurations
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", issueRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
