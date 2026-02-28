import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(appendAnecdote(content))
    dispatch(setNotification(`You created a new anecdote '${content}'`, 5000))
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name='anecdote'/>
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm