import { FormResponse, ResponseFilters } from "./index.types";

const filterResponses = (
  responses: FormResponse[],
  filters: ResponseFilters = [],
): FormResponse[] => {
  if (filters.length < 1) {
    return responses;
  }

  /**
   * There are many input types.
   * There are probably better ways to compare
   * all of them, but it would require iteration
   * and more information to determine them all.
   */
  const matchingResponses = responses.filter((res) => {
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

  return matchingResponses;
};

export default filterResponses;
