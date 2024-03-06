import { Request, Response, Router } from "express";
import {
  FilterClauseType,
  FormResponses,
  ResponseFilters,
} from "./index.types";
import getResponses from "./getResponses";
import filterResponses from "./filterResponses";

const router = Router();

const isValidFilterClause = (filter: any): filter is FilterClauseType => {
  try {
    return (
      typeof filter.id === "string" &&
      (typeof filter.value === "number" || typeof filter.value === "string") &&
      (filter.condition === "equals" ||
        filter.condition === "does_not_equal" ||
        filter.condition === "greater_than" ||
        filter.conditoin === "less_than")
    );
  } catch (err) {
    return false;
  }
};

const validResponseFilters = (filters: unknown): filters is ResponseFilters => {
  return Array.isArray(filters) && filters.every(isValidFilterClause);
};

const getFilteredResponses = async (req: Request, res: Response) => {
  try {
    const filters = req.query.filters
      ? JSON.parse(req.query.filters as string)
      : [];

    if (!validResponseFilters(filters)) {
      throw "Filter parameter is invalid.";
    }

    const responses: FormResponses = await getResponses(req);

    const filteredResponses = filterResponses(responses.responses, filters);

    /**
     * The total number of responses after filtering would be best determined by 1) database access
     * or 2) fetching all possible responses, filtering them, and getting the filtered array's length.
     * For 2, I'd create a loop to fetch responses and add them to an array until I had all of them.
     * For that to be reasonable, I'd want to know the median number of responses per formId and
     * how high the limit can go before it causes problems. I'd potentially explore a caching strategy
     * to avoid pointless churn.
     *
     * For this screening, I'm assuming there will never be more than the default limit (150)
     * total responses. (My test account has 11 total responses.)
     */
    const limit = req.query.limit ? Number(req.query.limit) : 150;
    const offset = req.query.offset ? Number(req.query.offset) : 0;

    const result: FormResponses = {
      responses: filteredResponses,
      totalResponses: filteredResponses.length,
      pageCount:
        filteredResponses.length % limit > 0
          ? Math.floor(filteredResponses.length / limit) + 1
          : filteredResponses.length / limit,
    };

    if (filteredResponses.length > limit) {
      result.responses = filteredResponses.slice(offset, offset + limit);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(`[Error]: ${JSON.stringify(err)}`);

    res
      .status(500)
      .send(
        `There was a problem processing the request. Server response: ${JSON.stringify(err)}`,
      );
  }
};

router.get("/:formId/filteredResponses", getFilteredResponses);

export default router;
