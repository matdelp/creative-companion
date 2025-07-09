import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { promptRouter } from "./routes/promptRouter";
import { userRouter } from "./routes/userRouter";
import { artworkRouter } from "./routes/artworkRouter";
import passport from "./services/passeport/googleAuth";
import session from "express-session";

const PORT = process.env.PORT || 5001;

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use("/prompt", promptRouter);
app.use("/artist", userRouter);
app.use("/artwork", artworkRouter);
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
