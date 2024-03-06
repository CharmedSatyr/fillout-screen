import express from "express";
import dotenv from "dotenv";

import rootHandler from "./routes/root";

dotenv.config();

const app = express();

app.use(rootHandler);

export default app;
