import React from 'react'
import { useDispatch } from 'react-redux'
import { createAddAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteText = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteObj = await anecdoteService.createNew(anecdoteText)
    dispatch(createAddAnecdote(anecdoteObj))
    showNotification(dispatch, `Created anecdote '${anecdoteText}'`)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
