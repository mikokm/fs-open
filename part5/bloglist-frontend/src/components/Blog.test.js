import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const testBlog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url',
    likes: 42,
    user: {
      name: 'test user',
    }
  }

  const mockAddLike = jest.fn()
  const mockRemoveBlog = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={testBlog} addLike={mockAddLike} removeBlog={mockRemoveBlog} />
    )
  })

  test('renders only blog title and author by default', () => {
    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).toHaveTextContent(testBlog.author)
    expect(component.container).not.toHaveTextContent(testBlog.url)
    expect(component.container).not.toHaveTextContent(testBlog.likes)
  })

  test('renders everything when expanded', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).toHaveTextContent(testBlog.author)
    expect(component.container).toHaveTextContent(testBlog.url)
    expect(component.container).toHaveTextContent(testBlog.likes)
  })

  test('addLike handler gets called when like button is clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockAddLike.mock.calls).toHaveLength(2)
  })
})
