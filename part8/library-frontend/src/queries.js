import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $publishedInt: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(title: $title, published: $publishedInt, author: $author, genres: $genres) {
      title
      published
      author{
        name
        born
        bookCount
      }
      genres
    }
  }
`

export const SET_BORN = gql`
  mutation editAuthor(
    $name: String!
    $bornInt: Int!
  ) {
    editAuthor(name: $name, setBornTo: $bornInt) {
      name
      born
    }  
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const GENRE_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
}
`

export const FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`
