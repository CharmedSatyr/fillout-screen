import { NextFunction, Request, Response, Router } from "express";
import { FormResponses } from "./filtered.types";

const router = Router();

const apiKey = process.env.FILLOUT_API_KEY;
const baseFilloutApiUrl = "https://api.fillout.com/v1/api/forms";

export const getFilloutFormResponse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const url = `${baseFilloutApiUrl}/${req.params.formId}`;

  try {
    const formResponse = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const response: FormResponses = await formResponse.json();

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .send(
        "There was a problem with the request. You are probably doing something weird to test my work for this technical screening.",
      );
  }
};

router.get("/:formId/filteredResponse", [getFilloutFormResponse]);

export default router;
