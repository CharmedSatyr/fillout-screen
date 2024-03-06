import express from "express";
import dotenv from "dotenv";

dotenv.config();

import routes from "./routes";

const app = express();

app.use(...routes);

export default app;
