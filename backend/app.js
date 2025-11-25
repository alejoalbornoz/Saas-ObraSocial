import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import "./cron/suscriptionCron.js";
import usersRouter from "./routes/users.route.js";
import shiftsRouter from "./routes/shifts.route.js";
import adminRouter from "./routes/admin.route.js";
import suscriptionsRouter from "./routes/suscriptions.route.js";

export const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/shifts", shiftsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/suscriptions", suscriptionsRouter);
