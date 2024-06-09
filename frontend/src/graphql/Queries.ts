import { gql } from '@apollo/client';

// Query to get all books
export const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

// Query to get all books in the reading list
export const GET_READING_LIST = gql`
  query ReadingList {
    readingList
  }
`;

// Query to search books by title or author
export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

// Mutation to add a book to the reading list
export const ADD_BOOK_TO_READING_LIST = gql`
  mutation AddBookToReadingList($title: String!) {
    addBookToReadingList(title: $title) {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

// Mutation to remove a book from the reading list
export const REMOVE_BOOK_FROM_READING_LIST = gql`
  mutation RemoveBookFromReadingList($title: String!) {
    removeBookFromReadingList(title: $title) {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;
