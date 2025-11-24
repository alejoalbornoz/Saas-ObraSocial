import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import "./cron/subscriptionCron.js";
import usersRouter from "./routes/users.route.js";
import shiftsRouter from "./routes/shifts.route.js";
import adminRouter from "./routes/admin.route.js";

export const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/shifts", shiftsRouter);
app.use("/api/admin", adminRouter);
