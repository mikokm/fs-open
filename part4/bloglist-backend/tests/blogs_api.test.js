const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testData = require('./test_data')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testData)
})

afterAll(() => {
  mongoose.connection.close()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are multiple blogs after initialization', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(testData.length)
})

test('the first blog has the same title as the blog in test data', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe(testData[0].title)
})

test('blogs have the field id', async () => {
  const response = await api.get('/api/blogs')
  for (const blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('adding a blog works', async () => {
  const before = await api.get('/api/blogs')
  const newBlog = {
    title: 'TEST_TITLE',
    author: 'TEST_AUTHOR',
    url: 'url',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const after = await api.get('/api/blogs')

  expect(after.body.length).toBe(before.body.length + 1)
  const found = after.body.find(
    blog => blog.title == newBlog.title && blog.author == newBlog.author
  )
  expect(found).toBeDefined()
})
