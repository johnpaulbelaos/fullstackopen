import { useMutation, useQuery } from "@apollo/client/react"
import { ALL_AUTHORS, ALL_BOOKS, SET_BORN } from "../queries"
import { useState } from "react"

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(SET_BORN, {
      refetchQueries: [
        { query: ALL_AUTHORS },
        { query: ALL_BOOKS },
      ],
    })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    
    const bornInt = +born

    editAuthor({ variables: { name, bornInt } })

    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <div>
        <form onSubmit={submit}>
          <div>
            <select name="name" id="name" onChange={({ target }) => setName(target.value)}>
              <option value='' selected>--Choose author--</option>
              {authors.map((a) => (
                <option value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
