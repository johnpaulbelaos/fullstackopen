import { useQuery } from "@apollo/client/react"
import { GENRE_BOOKS, FAVORITE_GENRE } from "../queries"

const Recommended = ({ show, favoriteGenre }) => {
  const result = useQuery(GENRE_BOOKS, { variables: { genre: favoriteGenre } })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
