const listHelper = require('../utils/list_helper')
const testBlogs = require('./test_data')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('empty list has zero likes', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('multiple blogs', () => {
    const result = listHelper.totalLikes(testBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blogs', () => {
  test('empty blog list returns undefined blog', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBeUndefined()
  })

  test('multiple blogs', () => {
    const result = listHelper.favoriteBlog(testBlogs)
    expect(result.likes).toBe(12)
  })
})

describe('most blogs', () => {
  test('empty blog list', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBeUndefined()
  })

  test('one blog', () => {
    const result = listHelper.mostBlogs([testBlogs[0]])
    expect(result).toStrictEqual({
      author: testBlogs[0].author,
      count: 1
    })
  })

  test('multiple blogs', () => {
    const result = listHelper.mostBlogs(testBlogs)
    expect(result).toStrictEqual({
      author: 'Robert C. Martin',
      count: 3
    })
  })
})

describe('most likes', () => {
  test('empty blog list', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBeUndefined()
  })

  test('one blog', () => {
    const result = listHelper.mostLikes([testBlogs[0]])
    expect(result).toStrictEqual({
      author: testBlogs[0].author,
      likes: 7
    })
  })

  test('multiple blogs', () => {
    const result = listHelper.mostLikes(testBlogs)
    expect(result).toStrictEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
