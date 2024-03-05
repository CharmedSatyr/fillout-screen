import app from "~/app";
import request from "supertest";

describe("~/app", () => {
    describe("GET /", () => {
        it("should return a 200 response and a string body", async () => {
            const response = await request(app).get("/");

            expect(response.statusCode).toBe(200);
            expect(response.text).toBe("Hello, Fillout!");
        });
    });

    describe("POST /", () => {
        it("should return a 404", async () => {
            const response = await request(app).post("/");
            
            expect(response.statusCode).toBe(404);
        });        
    });
});