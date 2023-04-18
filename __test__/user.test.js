const request = require("supertest");
const app = require("../src/app");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

let createdUserId;

// Users tests
describe("USERS", () => {
  // Executed before each test
  beforeAll(async () => await mongoose.connect(process.env.MONGODB_URI));
  // Executed after each test
  afterAll(async () => await mongoose.connection.close());

  // Post test
  it("creates a new user", async () => {
    // Arrange
    const userData = {
      username: "newUsername",
      email: "newemail@example.com",
      password: "newpassword",
    };
    // Act
    const response = await request(app)
      .post("/api/users/signup/")
      .send(userData);
    // Assert
    expect(response.status).toBe(200);
    createdUserId = response.body.id;
  }, 20000);

  // Patch test
  it("edits user information", async () => {
    // Arrange
    const userData = {
      username: "test2",
      email: "test@example.com",
    };
    // Act
    const response = await request(app)
      .patch("/api/users/" + createdUserId)
      .send(userData);
    // Assert
    expect(response.status).toBe(200);
  }, 20000);

  // Delete test
  it("deletes an user from database", async () => {
    // Act
    const response = await request(app)
      .delete("/api/users/" + createdUserId)
      .send();
    // Assert
    expect(response.status).toBe(200);
  }, 20000);
});

describe("GET /api/users", () => {
  it("should return a list of users", async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const response = await request(app).get("/api/users");
    expect(response.status).toEqual(200);
    expect(response.body.length > 0).toBe(true);
  });
});

describe("GET /api/users/:id", () => {
  it("should return an user by id", async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const response = await request(app).get(
      "/api/users/63b36cc6522013dfa299f1e5"
    );
    expect(response.status).toEqual(200);
    expect(response.body).not.toBe({} || null || undefined);
  });
});

describe("POST /api/users/login", () => {
  it("should return an user information", async () => {
    const user = {
      email: "alexjosebujosacruz@hotmail.com",
      password: "Alex12345678",
    };
    await mongoose.connect(process.env.MONGODB_URI);
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.status).toEqual(200);
    expect(response.body).not.toBe({} || null || undefined);
  });

  it("should return an user information", async () => {
    const user = {
      email: "alexjosebujosacruz@hotmail.com",
      password: "Boberto1234",
    };
    await mongoose.connect(process.env.MONGODB_URI);
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.status).toEqual(500);
    expect(response.body.message).toBe("Usuario o contraseña incorrecta");
  });
});
