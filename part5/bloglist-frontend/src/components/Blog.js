import React, { useState } from 'react'

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

const Blog = ({ blog, addLike }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title} by {blog.author}</span>
      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'view'}</button>
      {expanded ? BlogDetails(blog, addLike) : null}
    </div>
  )
}

export default Blog