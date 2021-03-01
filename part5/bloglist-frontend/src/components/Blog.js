import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogDetails = (blog, addLike) => {
  return (
    <div>
      <p>url: {blog.url}</p>
      <p>
        likes: {blog.likes}
        <button onClick={() => addLike(blog)}>like</button>
      </p>
      <p>Added by {blog.user.name}</p>
    </div>
  )
}

const Blog = ({ blog, addLike, removeBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const confirmRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title} by {blog.author}</span>
      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'view'}</button>
      <button onClick={() => confirmRemove(blog)}>remove</button>
      {expanded ? BlogDetails(blog, addLike) : null}
    </div>
  )
}

Blog.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
