import React from 'react';
import ReadingListItem from './ReadingListItem';
import { Book } from '../types';
import { Grid } from '@mui/material';

interface ReadingListProps {
  readingList: Book[];
  removeBookFromReadingList: (title: string) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ readingList, removeBookFromReadingList }) => {
    console.log(readingList)
  return (
    <Grid container spacing={2}>
      {readingList.map((book, index) => (
         <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
        <ReadingListItem key={index} book={book} removeBookFromReadingList={removeBookFromReadingList} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReadingList;
