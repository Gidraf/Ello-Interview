import React from 'react';
import BookItem from './BookItem';
import { Book } from '../types';
import { Grid } from '@mui/material';

interface BookListProps {
  books: Book[];
  addBookToReadingList: (book: Book) => void;
  readList: any;
  removeBookFromReadingList: (title: string) =>  void;
}

const BookList: React.FC<BookListProps> = ({ books, addBookToReadingList, readList, removeBookFromReadingList}) => {
  return (
    <Grid container spacing={2}>
      {books.map((book, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <BookItem readList={readList} removeBookFromReadingList={removeBookFromReadingList} book={book} addBookToReadingList={addBookToReadingList} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
