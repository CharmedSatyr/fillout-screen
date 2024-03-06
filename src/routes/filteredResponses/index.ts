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

    const filteredResponses = filterResponses(responses, filters);

    return res.status(200).json(filteredResponses);
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
