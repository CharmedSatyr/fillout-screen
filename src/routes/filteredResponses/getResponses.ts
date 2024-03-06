import { Request } from "express";
import { FormResponse, FormResponses } from "./index.types";

const apiKey = process.env.FILLOUT_API_KEY;

const getResponsesBatch = async (url: string): Promise<FormResponses> => {
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!result.ok) {
    throw result;
  }

  return await result.json();
};

const getResponses = async (req: Request): Promise<FormResponse[]> => {
  const passthroughParams = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    /**
     * Ignoring the limit here to fetch all responses. Once we have all responses,
     * We will be able to return an accurate count of filtered responses.
     * In a real implementation, I'd want to know the median number of responses per formId and
     * how high the limit can go before it causes problems. I'd potentially explore
     * a caching strategy to avoid pointless churn.
     */
    if (!value || key === "filters" || key === "limit" || key === "offset") {
      continue;
    }

    passthroughParams.append(key, value.toString());
  }

  const collectedResponses: FormResponse[] = [];
  let responsesRequired = 1;
  let offset = 0;

  while (collectedResponses.length < responsesRequired) {
    passthroughParams.append("offset", offset.toString());
    const url = `https://api.fillout.com/v1/api/forms/${req.params.formId}/submissions?${passthroughParams.toString()}`;

    const result = await getResponsesBatch(url);
    responsesRequired = result.totalResponses;
    collectedResponses.push(...result.responses);
    offset = collectedResponses.length;
  }

  return collectedResponses;
};

export default getResponses;
