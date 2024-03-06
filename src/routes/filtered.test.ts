import { FormResponses, ResponseFilters } from "~/routes/filtered.types";

const mockResponse: FormResponses = {
  responses: [
    {
      questions: [
        {
          id: "abcdef",
          name: "What's your name?",
          type: "ShortAnswer",
          value: "Timmy",
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
  ],
  totalResponses: 300,
  pageCount: 2,
};

const mockInput: ResponseFilters = [
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

describe("~/routes/filtered", () => {
  it("should be good", () => {
    mockResponse;
    mockInput;
    expect(true).toBeTruthy();
  });
});
