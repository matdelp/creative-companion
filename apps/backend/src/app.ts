import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { promptRouter } from "./routes/promptRouter";
import { userRouter } from "./routes/userRouter";
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/prompt", promptRouter);
app.use("/artist", userRouter);
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
