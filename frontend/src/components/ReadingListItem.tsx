import React from 'react';
import { Book } from '../types';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

interface ReadingListItemProps {
  book: Book;
  removeBookFromReadingList: (title: string) => void;
}

const ReadingListItem: React.FC<ReadingListItemProps> = ({ book, removeBookFromReadingList }) => {
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
        <Button variant="contained" color="secondary" onClick={() => removeBookFromReadingList(book.title)}>
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReadingListItem;
