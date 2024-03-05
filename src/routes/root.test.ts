import { Request, Response } from "express";
import { getRoot } from "~/routes/root";

describe("~/routes/root", () => {
  describe("GET /", () => {
    it("should return a 200 response and a string body", async () => {
      const req = {} as Request;
      const res = { send: jest.fn() } as unknown as Response;

      getRoot(req, res);

      expect(res.send).toHaveBeenCalledWith("Hello, Fillout!");
    });
  });
});
