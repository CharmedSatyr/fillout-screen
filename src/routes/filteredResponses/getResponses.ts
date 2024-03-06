import { Request } from "express";
import { FormResponses } from "./index.types";

const apiKey = process.env.FILLOUT_API_KEY;

const getResponses = async (req: Request): Promise<FormResponses> => {
  const url = `https://api.fillout.com/v1/api/forms/${req.params.formId}/submissions`;

  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!result.ok) {
    throw result;
  }

  const responses: FormResponses = await result.json();

  // TODO: There is pagination. You don't have all the responses if pageCount > 1.
  return responses;
};

export default getResponses;
