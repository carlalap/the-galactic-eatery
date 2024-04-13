// backend/tests/backend.test.js
const { connectDB } = require('../connection');
const request = require('supertest');
const app = require('../index');

describe('Backend Tests', () => {
  describe('connectDB', () => {
    test('should connect to the database successfully', async () => {
      const result = await connectDB();
      expect(result).toBeDefined();
      expect(result.topology).toBeDefined();
      expect(result.topology.isConnected()).toBe(true);
    });

    test('should return an error if connection fails', async () => {
      // Mock the MongoClient to simulate a connection error
      jest.mock('mongodb', () => ({
        MongoClient: jest.fn().mockImplementation(() => ({
          connect: jest.fn().mockRejectedValue(new Error('Connection failed')),
        })),
      }));

      const result = await connectDB();
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('Connection failed');
    });
  });

  describe('POST /register', () => {
    test('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/register')
        .send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(201);
      expect(response.text).toBe('User registered successfully');
    });

    test('should return an error if username already exists', async () => {
      const response = await request(app)
        .post('/register')
        .send({ username: 'existinguser', password: 'password' });

      expect(response.status).toBe(400);
      expect(response.text).toBe('Username already exists');
    });
  });

  // Add more test cases for other routes and scenarios
});