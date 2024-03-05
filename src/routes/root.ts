import express, { Request, Response } from "express";

const router = express.Router();

export const getRoot = (_: Request, res: Response) => {
  res.send("Hello, Fillout!");
};

router.get("/", getRoot);

export default router;
