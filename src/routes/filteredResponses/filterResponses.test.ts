import filterResponses from "~/routes/filteredResponses/filterResponses";
import {
  ResponseFilters,
  FormResponse,
} from "~/routes/filteredResponses/index.types";

describe("filterResponses", () => {
  it("should return the original response if there are no filters", () => {
    const responses: FormResponse[] = [
      {
        questions: [
          {
            id: "nameId",
            name: "What's your name?",
            type: "ShortAnswer",
            value: "Timmy",
          },
          {
            id: "birthdayId",
            name: "What is your birthday?",
            type: "DatePicker",
            value: "2024-02-22T05:01:47.691Z",
          },
        ],
        calculations: [
          {
            id: "calculation1",
            name: "price",
            type: "number",
            value: "12.50",
          },
        ],
        urlParameters: [
          {
            id: "email",
            name: "email",
            value: "example@example.com",
          },
        ],
        quiz: {
          score: 5,
          maxScore: 10,
        },
        submissionId: "abc",
        submissionTime: "2024-05-16T23:20:05.324Z",
      },
    ];

    const filters: ResponseFilters = [];

    const result = filterResponses(responses, filters);

    expect(result).toEqual(responses);
  });

  it("should return matching responses when there is one filter", () => {
    const responses: FormResponse[] = [
      {
        questions: [
          {
            id: "nameId",
            name: "What's your name?",
            type: "ShortAnswer",
            value: "Timmy",
          },
          {
            id: "birthdayId",
            name: "What is your birthday?",
            type: "DatePicker",
            value: "2024-02-22T05:01:47.691Z",
          },
        ],
        calculations: [],
        urlParameters: [],
        submissionId: "abc",
        submissionTime: "2024-05-16T23:20:05.324Z",
      },
    ];

    const filters: ResponseFilters = [
      {
        id: "nameId",
        condition: "equals",
        value: "Timmy",
      },
    ];

    const result = filterResponses(responses, filters);

    expect(result).toEqual(responses);
  });

  it("should return matching responses when there is one filter", () => {
    const responses: FormResponse[] = [
      {
        questions: [
          {
            id: "nameId",
            name: "What's your name?",
            type: "ShortAnswer",
            value: "Timmy",
          },
          {
            id: "birthdayId",
            name: "What is your birthday?",
            type: "DatePicker",
            value: "2024-02-22T05:01:47.691Z",
          },
        ],
        calculations: [],
        urlParameters: [],
        submissionId: "abc",
        submissionTime: "2024-05-16T23:20:05.324Z",
      },
    ];

    const filters: ResponseFilters = [
      {
        id: "nameId",
        condition: "equals",
        value: "Timmy",
      },
    ];

    const result = filterResponses(responses, filters);

    expect(result).toEqual(responses);
  });

  it("should return no responses if there are no matches", () => {
    const responses: FormResponse[] = [
      {
        questions: [
          {
            id: "nameId",
            name: "What's your name?",
            type: "ShortAnswer",
            value: "Timmy",
          },
          {
            id: "birthdayId",
            name: "What is your birthday?",
            type: "DatePicker",
            value: "2024-02-22T05:01:47.691Z",
          },
        ],
        calculations: [
          {
            id: "calculation1",
            name: "price",
            type: "number",
            value: "12.50",
          },
        ],
        urlParameters: [
          {
            id: "email",
            name: "email",
            value: "example@example.com",
          },
        ],
        quiz: {
          score: 5,
          maxScore: 10,
        },
        submissionId: "abc",
        submissionTime: "2024-05-16T23:20:05.324Z",
      },
    ];

    const filters: ResponseFilters = [
      {
        id: "nameId",
        condition: "equals",
        value: "Timmy",
      },
      {
        id: "birthdayId",
        condition: "greater_than",
        value: "2024-02-23T05:01:47.691Z",
      },
    ];

    const result = filterResponses(responses, filters);

    const expectedResult: FormResponse[] = [];

    expect(result).toEqual(expectedResult);
  });
});
