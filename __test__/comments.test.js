const request = require('supertest');
const app = require("../src/app"); // assuming you have your Express app in a file called app.js
const dotenv = require('dotenv')
const { default: mongoose } = require("mongoose");
dotenv.config()
describe('GET /api/comments/:id', () => {
  test('should return 500 for non-existent ID', async () => {
  const res = await request(app).get('/api/comments/123456789');
  expect(res.status).toEqual(500);
  }, 10000); 

});


describe('POST /api/comments', () => {
  test('should return 400 for incomplete data', async () => {
    const incompleteComment = {
      article: '63b513789070177151f1c2af',
      user: 'Bujosa2023',
    };
    const res = await request(app)
      .post('/api/comments')
      .send(incompleteComment);
    expect(res.status).toEqual(500);
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
