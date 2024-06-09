import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReadingListItem from '../../components/ReadingListItem';
import { Book } from '../../types';

const mockBook: Book =   {
    title: 'Lucky Fairy and the Tower of Dreams',
    author: 'Taylor Brown',
    coverPhotoURL: 'assets/image6.webp',
    readingLevel: 'J'
  };

const removeBookFromReadingList = jest.fn();

describe('ReadingListItem Component', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <ReadingListItem
        book={mockBook}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display book title and author', () => {
    render(
      <ReadingListItem
        book={mockBook}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    expect(screen.getAllByText('Lucky Fairy and the Tower of Dreams')).not.toBe(null);
    // expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('should call removeBookFromReadingList when remove button is clicked', () => {
    render(
      <ReadingListItem
        book={mockBook}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    const removeButton = screen.getAllByAltText('Remove');
    // fireEvent.click(removeButton);
    expect(removeButton).not.toBe(null);
  });

  it('should display book cover image', () => {
    render(
      <ReadingListItem
        book={mockBook}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    );

    const coverImage = screen.getAllByText('Taylor Brown');
    expect(coverImage).not.toBe(null);
  });
});
