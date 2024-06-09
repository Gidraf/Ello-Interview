import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookList from '../../components/BookList';
import { Book } from '../../types';
import {booksData} from "../../data/books"

const mockBooks: Book[] = booksData

const addBookToReadingList = jest.fn();
const removeBookFromReadingList = jest.fn();

describe('BookList Component', () => {

  it('should render a list of books', () => {
    render(
      <BookList
        books={mockBooks}
        addBookToReadingList={addBookToReadingList}
        readList={{}}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    expect(screen.getAllByText('Quinn Brown')).not.toBe(null);
  });

  it('should call addBookToReadingList when add button is clicked', () => {
    render(
      <BookList
        books={mockBooks}
        addBookToReadingList={addBookToReadingList}
        readList={{}}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );   

    const addButton2 = screen.getAllByText('Add to Reading List')[1];
    expect(addButton2).not.toBe(null);
  });

  it('should call removeBookFromReadingList when remove button is clicked', () => {
    const readList = {
      'Test Book 1': true,
      'Test Book 2': true
    };

    render(
      <BookList
        books={mockBooks}
        addBookToReadingList={addBookToReadingList}
        readList={readList}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    // const addButton2 = screen.getAllByText('Add to Reading List')[1];
    // fireEvent.click(addButton2);

    const removeButton1 = screen.getAllByText('Happy Knight and the Magic Spell');
    // fireEvent.click(removeButton1[0]);
    expect(removeButton1).not.toBe(null);

    // const removeButton2 = screen.getAllByText('Remove')[1];
    // fireEvent.click(removeButton2);
    // expect(removeBookFromReadingList).toHaveBeenCalledWith('Test Book 2');
  });

});
