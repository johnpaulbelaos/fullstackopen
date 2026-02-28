import { useSelector, useDispatch } from "react-redux"
import { incrementVote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const anecdotesToShow = filter
      ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      : anecdotes;
    
    return anecdotesToShow
  })
  const dispatch = useDispatch()

  const vote = id => {
    const anecdote = anecdotes.find(a => a.id === id).content
    dispatch(incrementVote(id))
    dispatch(setNotification(`You voted '${anecdote}'`, 5000))
  }

  return (
    anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))
  )
}

export default AnecdoteList