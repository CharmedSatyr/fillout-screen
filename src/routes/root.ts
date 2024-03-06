import { Request, Response, Router } from "express";

const router = Router();

export const getRoot = (_: Request, res: Response) => {
  res.send("Hello, Fillout!");
};

router.get("/", getRoot);

export default router;
