import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { promptRouter } from "./routes/promptRouter";
import { userRouter } from "./routes/userRouter";
import { artworkRouter } from "./routes/artworkRouter";
import passport from "./services/passeport/googleAuth";
import session from "express-session";
import path from "path";

const PORT = Number(process.env.PORT) || 5001;

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

app.use("/api/prompt", promptRouter);
app.use("/api/artist", userRouter);
app.use("/api/artwork", artworkRouter);

// Production
app.use(express.static(path.join(__dirname, "../build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
