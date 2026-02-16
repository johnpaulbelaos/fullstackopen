const assert = require('node:assert');
const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

describe('when creating a new user', () => {
  test('creation succeeds with fresh and valid username', async () => {
    const newUser = {
      username: 'faker',
      name: 'sanghyeok',
      password: 'goat'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, 1);

    const usernames = usersAtEnd.map(u => u.username);
    assert(usernames.includes(newUser.username));
  });

  test('creation fails if username is not unique', async () => {
    const newUser = {
      username: 'striker',
      name: 'eureka',
      password: 'aussie'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('creation fails if username is not at least 3 characters', async () => {
    const newUser = {
      username: 'jp',
      name: 'john',
      password: 'incorrect'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('creation fails if password is not at least 3 characters', async () => {
    const newUser = {
      username: 'striker',
      name: 'eureka',
      password: ''
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });
});


after(async () => {
  await mongoose.connection.close();
});
