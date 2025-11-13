import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import usersRouter from "./routes/users.route.js";

export const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/api/users", usersRouter);
