import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client/react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import LoginForm from './components/LoginForm'

import { FAVORITE_GENRE, BOOK_ADDED } from './queries'

import { addBookToCache } from './utils/apolloCache'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [page, setPage] = useState('authors')
  const [genre, setGenre] = useState(null)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      addBookToCache(client.cache, addedBook)
    },
  })

  const result = useQuery(FAVORITE_GENRE)
  
  if (result.loading)  {
    return <div>loading...</div>
  }

  const showWhenToken = { display: token ? '' : 'none' }
  const hideWhenToken = { display: token ? 'none' : '' }

  const handleRecommended = () => {
    setPage('recommended')
    if (result.data.me) {
      setGenre(result.data.me.favoriteGenre)
    }
  }

  const onLogout = () => {
    setToken(null)  
    setPage('authors')
    setGenre(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')} style={showWhenToken}>add book</button>
        <button onClick={handleRecommended} style={showWhenToken}>recommended</button>
        <button onClick={() => setPage('login')} style={hideWhenToken}>login</button>
        <button onClick={onLogout} style={showWhenToken}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} favoriteGenre={genre}/>

      <Recommended show={page === 'recommended'} favoriteGenre={genre} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} meQuery={result} />
    </div>
  )
}

export default App
