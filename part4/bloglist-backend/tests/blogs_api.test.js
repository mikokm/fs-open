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

const findTestBlog = (blogs) => {
  return blogs.find(blog => blog.title == 'TEST_TITLE' && blog.author == 'TEST_AUTHOR')
}

test('adding a blog works', async () => {
  const testBlog = {
    title: 'TEST_TITLE',
    author: 'TEST_AUTHOR',
    url: 'url',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const after = await api.get('/api/blogs')

  expect(after.body.length).toBe(testData.length + 1)
  const found = findTestBlog(after.body)
  expect(found).toBeDefined()
})

test('removing a blog works', async () => {
  const before = await api.get('/api/blogs')
  const toRemove = before.body[0]
  await api
    .delete(`/api/blogs/${toRemove.id}`)
    .expect(204)

  const after = await api.get('/api/blogs')
  expect(after.body.length).toBe(before.body.length - 1)
  expect(after.body).not.toContain(toRemove)
})

test('blogs get default like value of 0', async () => {
  const testBlogWithoutLikes = {
    title: 'TEST_TITLE',
    author: 'TEST_AUTHOR',
    url: 'url',
  }

  await api
    .post('/api/blogs')
    .send(testBlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const after = await api.get('/api/blogs')
  const found = findTestBlog(after.body)
  expect(found).toBeDefined()
  expect(found.likes).toBe(0)
})

test('new blogs need to have title and url', async () => {
  const testBlogWithoutTitle = {
    author: 'TEST_AUTHOR',
    url: 'url',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(testBlogWithoutTitle)
    .expect(400)
})
