import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmitBlog = (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    createBlog(blog)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmitBlog}>
        <div>
          title
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
