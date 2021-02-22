const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length == 0) {
    return 0
  }

  return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, cur) => {
    if (cur.likes > acc.likes) {
      acc.likes = cur.likes
      acc.blog = cur
    }

    return acc
  }, { likes: 0, blog: undefined }).blog
}

const mostBlogs = (blogs) => {
  if (blogs.length == 0) {
    return undefined
  }

  const authorAndCount = _(blogs).countBy('author').entries().maxBy(_.last)

  return {
    author: _.first(authorAndCount),
    count: _.last(authorAndCount)
  }
}

const mostLikes = (blogs) => {
  if (blogs.length == 0) {
    return undefined
  }

  const authors = _.groupBy(blogs, 'author')
  const likes = _.reduce(authors, (res, blogs, author) => {
    const total = blogs.reduce((acc, cur) => acc + cur.likes, 0)
    if (total > res.likes) {
      res.likes = total
      res.author = author
    }
    return res
  },
  {
    author: '',
    likes: 0
  })

  return likes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
