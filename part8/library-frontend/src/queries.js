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