import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [highestVoted, setHighestVoted] = useState({ votes: 0, index: 0 })
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const clickNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const clickVote = () => {
    const updatedVotes = [...votes]
    const voteCount = updatedVotes[selected] += 1
    setVotes(updatedVotes)

    if (voteCount > highestVoted.votes) {
      setHighestVoted({ votes: voteCount, index: selected })
    }
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={clickVote}>vote</button>
      <button onClick={clickNext}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[highestVoted.index]}</p>
    </>
  )
}

export default App
