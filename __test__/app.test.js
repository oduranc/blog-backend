const request = require("supertest");
const app = require("../src/app");
describe("GET /", () => {
  it("responds with JSON message 'Tu real api manito.'", async () => {
    const response = await request(app).get("/").send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Tu real api manito.");
  });
});
