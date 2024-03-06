import { FormResponses, ResponseFilters } from "./index.types";

const filterResponses = (
  responses: FormResponses,
  filters: ResponseFilters = [],
): FormResponses => {
  if (filters.length < 1) {
    return responses;
  }

  /**
   * There are many input types.
   * There are proably better ways to compare
   * all of them, but it would require iteration
   * and more information to determine them all.
   */
  const matchingResponses = responses.responses.filter((res) => {
    return filters.every((filter) => {
      return res.questions
        .filter((question) => question.id === filter.id)
        .every((question) => {
          if (
            filter.condition === "equals" &&
            question.value !== filter.value
          ) {
            return false;
          }

          if (
            filter.condition === "does_not_equal" &&
            question.value === filter.value
          ) {
            return false;
          }

          if (
            filter.condition === "greater_than" &&
            ((typeof question.value === "number" &&
              typeof filter.value === "number") ||
              (typeof question.value === "string" &&
                typeof filter.value === "string")) &&
            question.value <= filter.value
          ) {
            return false;
          }

          if (
            filter.condition === "less_than" &&
            ((typeof question.value === "number" &&
              typeof filter.value === "number") ||
              (typeof question.value === "string" &&
                typeof filter.value === "string")) &&
            question.value >= filter.value
          ) {
            return false;
          }

          return true;
        });
    });
  });

  return {
    responses: matchingResponses,
    totalResponses: matchingResponses.length,
    pageCount: matchingResponses.length > 0 ? 1 : 0, // TODO
  };
};

export default filterResponses;
