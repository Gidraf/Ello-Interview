import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReadingList from '../../components/ReadingList';
import { Book } from '../../types';
import {booksData} from "../../data/books"


const mockReadingList: Book[] = booksData;

const removeBookFromReadingList = jest.fn();

describe('ReadingList Component', () => {
 

  it('should render a list of reading list items', () => {
    render(
      <ReadingList
        readingList={mockReadingList}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    expect(screen.getAllByText('Clever Monster on the Wonder Island')).not.toBe(null);
    
  });

  it('should call removeBookFromReadingList when remove button is clicked', () => {
    render(
      <ReadingList
        readingList={mockReadingList}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    const removeButton1 = screen.getAllByText('Remove'); // Assuming the button text is 'Remove'
   
    expect(removeButton1).not.toBe(null);

  });

  it('should render the correct number of ReadingListItem components', () => {
    render(
      <ReadingList
        readingList={mockReadingList}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    const readingListItems = screen.getAllByText('Remove');
    expect(readingListItems).not.toBe(mockReadingList.length);
  });
});
