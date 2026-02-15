const assert = require('node:assert');
const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, 2);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the unique identifier property is named id', async () => {
  const blogs = await helper.blogsInDb();
  blogs.forEach((blog) => {
    assert.notStrictEqual(blog.id, undefined);
    assert.strictEqual(blog._id, undefined);
  });
});

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
});

test('if likes property is missing, default to 0', async () => {
  const blogWithNoLikes = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  };

  await api
    .post('/api/blogs')
    .send(blogWithNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await helper.blogsInDb();
  blogs.forEach((blog) => {
    if (blog.title === 'Canonical string reduction') {
      assert.strictEqual(blog.likes, 0);
    }
  });
});

test('if title or url missing, respond with status code 400', async () => {
  const blogWithNoTitle = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  };
  const blogWithNoUrl = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra'
  };

  await api
    .post('/api/blogs')
    .send(blogWithNoTitle)
    .expect(400);

  await api
    .post('/api/blogs')
    .send(blogWithNoUrl)
    .expect(400);
});

test('deletion of a blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  const ids = blogsAtEnd.map(b => b.id);
  assert(!ids.includes(blogToDelete.id));

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

test.only('update likes of blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updatedBlog = {
    title: blogsAtStart[0].title,
    author: blogsAtStart[0].author,
    url: blogsAtStart[0].url,
    likes: 100
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const blog = blogsAtEnd.filter((b) => b.id === blogToUpdate.id);

  assert.strictEqual(100, blog[0].likes);

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
