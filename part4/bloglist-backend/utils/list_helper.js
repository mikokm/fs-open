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

module.exports = {
  dummy,
  totalLikes
}
