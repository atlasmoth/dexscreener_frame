import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import * as middleware from "./middleware";
import { logger } from "./utils/logger";
import pinoHTTP from "pino-http";
import { beginFrame, continueFrame } from "./frames/frames.controller";
import schedule from "./jobs";

schedule;
require("dotenv").config();

const app = express();

// app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  pinoHTTP({
    logger,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.route("/frames").get(beginFrame).post(continueFrame);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

export default app;
