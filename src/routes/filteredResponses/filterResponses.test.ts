import filterResponses from "~/routes/filteredResponses/filterResponses";
import {
  ResponseFilters,
  FormResponses,
} from "~/routes/filteredResponses/index.types";

describe("filterResponses", () => {
  const mockResponse: FormResponses = {
    responses: [
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

  it("should return the original response if there are no filters", () => {
    const result = filterResponses(mockResponse);

    expect(result).toEqual(mockResponse);
  });

  it("should return matching responses when there is one filter", () => {
    const thing: FormResponses = {
      responses: [
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
      ],
      totalResponses: 1,
      pageCount: 1,
    };

    const input: ResponseFilters = [
      {
        id: "nameId",
        condition: "equals",
        value: "Timmy",
      },
    ];

    const result = filterResponses(thing, input);

    expect(result).toEqual(thing);
  });

  it("should return matching responses when there is one filter", () => {
    const thing: FormResponses = {
      responses: [
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
      ],
      totalResponses: 1,
      pageCount: 1,
    };

    const input: ResponseFilters = [
      {
        id: "nameId",
        condition: "equals",
        value: "Timmy",
      },
    ];

    const result = filterResponses(thing, input);

    expect(result).toEqual(thing);
  });

  it("should return no responses if there are no matches", () => {
    const result = filterResponses(mockResponse, mockInput);

    const expectedResult = {
      responses: [],
      totalResponses: 0,
      pageCount: 0,
    };

    expect(result).toEqual(expectedResult);
  });
});
