import React from 'react'
import { useDispatch } from 'react-redux'
import { createAddAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdoteText = event.target.anecdote.value;
        event.target.anecdote.value = ''
        dispatch(createAddAnecdote(anecdoteText))
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
