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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
