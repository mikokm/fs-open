const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id === action.data.id ? {
          ...anecdote,
          votes: anecdote.votes + 1
        }
          : anecdote)
    case 'ADD_ANECDOTE':
      return state.concat(action.data.anecdote)
    case 'INITIALIZE_ANECDOTES':
      return action.data.anecdotes
    default: return state
  }
}

export const createVote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const createAddAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      anecdote: anecdote
    }
  }
}

export const initializeAnecdotes = (anecdotes => {
  return {
    type: 'INITIALIZE_ANECDOTES',
    data: {
      anecdotes: anecdotes
    }
  }
})

export default reducer
