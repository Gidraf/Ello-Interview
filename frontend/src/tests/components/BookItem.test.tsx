import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookItem from '../../components/BookItem';


const mockBook = {
  title: 'Test Book',
  author: 'Test Author',
  coverPhotoURL: 'assets/image10.webp',
  readingLevel:"D"
};

const addBookToReadingList = jest.fn();
const removeBookFromReadingList = jest.fn();

describe('BookItem Component', () => {
  it('should match the snapshot when book is not in the reading list', () => {
    const { asFragment } = render(
      <BookItem
        book={mockBook}
        addBookToReadingList={addBookToReadingList}
        readList={{}}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match the snapshot when book is in the reading list', () => {
    const { asFragment } = render(
      <BookItem
        book={mockBook}
        addBookToReadingList={addBookToReadingList}
        readList={{ 'Test Book': true }}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display book title and author', () => {
    render(
      <BookItem
        book={mockBook}
        addBookToReadingList={addBookToReadingList}
        readList={{}}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('should display add button when book is not in the reading list', () => {
    render(
      <BookItem
        book={mockBook}
        addBookToReadingList={addBookToReadingList}
        readList={{}}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    const addButton = screen.getByText('Add to Reading List');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(addBookToReadingList).toHaveBeenCalledWith(mockBook);
  });

  it('should display remove button when book is in the reading list', () => {
    render(
      <BookItem
        book={mockBook}
        addBookToReadingList={addBookToReadingList}
        readList={{ 'Test Book': true }}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    const removeButton = screen.getByText('Remove');
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    expect(removeBookFromReadingList).toHaveBeenCalledWith('Test Book');
  });

  it('should display book cover image', () => {
    render(
      <BookItem
        book={mockBook}
        addBookToReadingList={addBookToReadingList}
        readList={{}}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    const coverImage = screen.getByTitle('green iguana');
    expect(coverImage).not.toBe(null);
  });
});
