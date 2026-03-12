import { useState } from 'react'
import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, GENRE_BOOKS } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  const filteredResult = useQuery(GENRE_BOOKS, { variables: { genre } })

  if (result.loading || filteredResult.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const filteredBooks = filteredResult.data.allBooks

  /* take array of genres for each book, flatten the array, then convert to Set to filter unique genres
  before converting to Array again */
  const genres = Array.from(new Set(books.map((b) => b.genres).flat()))

  const showGenre = { display: genre ? '' : 'none'}

  const handleClick = (event) => {
    setGenre(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>

      <p style={showGenre}>in genre <strong>{genre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button onClick={handleClick} value={genre}>{genre}</button>
      ))}
      <button onClick={handleClick} value={null}>all genres</button>
    </div>
  )
}

export default Books
