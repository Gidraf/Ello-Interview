import React from 'react';
import { Book } from '../types';
import { Card, CardContent, Typography, Button, CardMedia, CardActions } from '@mui/material';




interface BookItemProps {
  book: Book;
  addBookToReadingList: (book: Book) => void;
  readList: any;
  removeBookFromReadingList: (title: string) => void
}

const BookItem: React.FC<BookItemProps> = ({ book, addBookToReadingList, readList, removeBookFromReadingList }) => {
    console.log(book.title)
    console.log(readList)
  return (
    <Card style={{ marginBottom: '16px' }}>
       <CardMedia
        sx={{ height: 140 }}
        image={require(`../${book.coverPhotoURL}`)}
        title="green iguana"
      />
      <CardContent>
        <Typography variant="h5">{book.title}</Typography>
        <Typography variant="subtitle1">{book.author}</Typography>
        { !readList[book.title] ? <Button variant="contained" color="primary" onClick={() => addBookToReadingList(book)}>
           Add to Reading List
         </Button> : <Button variant="contained" color="secondary" onClick={() => removeBookFromReadingList(book.title)}>
Remove
</Button>
         
         }
      </CardContent>
    </Card>
  );
};

export default BookItem;
