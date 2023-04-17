const request = require('supertest');
const app = require("../src/app"); 
const dotenv = require('dotenv')
const { default: mongoose } = require("mongoose");
dotenv.config();

describe('GET /api/comments/:id', () => {

  it('should return 500 for non-existent id', async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    const response = await request(app).get('/api/comments/123456789');
    expect(response.status).toEqual(500);
  }); 

  it('get a single comment by ID', async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    const response = await request(app).get('/api/comments/63b736333d17b759c20a3274');
    expect(response.status).toEqual(200);
  });

});


describe('POST /api/comments', () => {

  it('should return 400 for incomplete data', async () => {
    const incompleteComment = {
      article: '63b513789070177151f1c2af',
      user: 'Bujosa2023',
    };
    const response = await request(app)
      .post('/api/comments')
      .send(incompleteComment);
    expect(response.status).toEqual(500);
  });

});


describe('GET /api/comments', () => {

  it('should return a list of comments', async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    const response = await request(app).get('/api/comments');
    expect(response.status).toEqual(200);
    expect(response.body.length > 0).toBe(true); 
  });

});

describe('GET /api/comments/article/:article', () => {

  it('should return an article by id', async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    const response = await request(app).get('/api/comments/article/63b505039070177151f1c265');
    expect(response.status).toEqual(200);
  });

});




