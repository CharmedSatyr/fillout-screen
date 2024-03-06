import { Request } from "express";
import { FormResponses } from "./index.types";

const apiKey = process.env.FILLOUT_API_KEY;

const getResponses = async (req: Request): Promise<FormResponses> => {
  const passthroughParams = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    if (!value || key === "filters") {
      continue;
    }

    passthroughParams.append(key, value.toString());
  }

  const url = `https://api.fillout.com/v1/api/forms/${req.params.formId}/submissions?${passthroughParams.toString()}`;

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

  return responses;
};

export default getResponses;
