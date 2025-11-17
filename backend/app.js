import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.route.js";

export const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
