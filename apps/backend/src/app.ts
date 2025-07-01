import express from "express";
import dotenv from "dotenv";
import { promptRouter } from "./routes/promptRouter";
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/prompt", promptRouter);
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
