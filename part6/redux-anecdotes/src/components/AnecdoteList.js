import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.includes(state.filter)))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(createVote(anecdote.id))
    showNotification(dispatch, `Voted '${anecdote.content}'`)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
