const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blog);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
  response.json(blog);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const savedBlogPopulated = await savedBlog.populate('user', { username: 1, name: 1 });

  response.status(201).json(savedBlogPopulated);
});

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });

  blog.comments = blog.comments.concat(body)

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const savedBlogPopulated = await savedBlog.populate('user', { username: 1, name: 1 });

  response.status(201).json(savedBlogPopulated);
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { likes } = request.body;

  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
  if (!blog) return response.status(404).end();

  blog.likes = likes;

  const updatedBlog = await blog.save();
  response.json(updatedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if ( blog.user.toString() === user._id.toString() ) {
    user.blogs = user.blogs.filter(b => b.id.toString() !== blog.id.toString());
    await blog.deleteOne();
    response.status(204).end();
  } else {
    response.status(403).json({ error: 'user not authorized' });
  }
});

module.exports = blogsRouter;
