import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_VOTE':
      return state.map(anecdote => anecdote.id === action.data.id ? action.data : anecdote)
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'INITIALIZE_ANECDOTES':
      return action.data
    default: return state
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedObj = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })

    dispatch({
      type: 'ADD_VOTE',
      data: updatedObj
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteObj = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdoteObj
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer
