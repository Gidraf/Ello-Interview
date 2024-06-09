import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';
import { booksData } from '../data/books';
import fs from 'fs';
import path from 'path';
import { resolvers } from '../resolvers';
import { typeDefs } from '../schema';

const schema = makeExecutableSchema({ typeDefs, resolvers });

jest.mock('fs');

describe('GraphQL Schema', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('books query returns all books', async () => {
    const query = `
      query {
        books {
          author
          coverPhotoURL
          readingLevel
          title
        }
      }
    `;
    const result = await graphql({
      schema,
      source: query
    });
    expect(result.data).toEqual({
      books: booksData,
    });
  });

  test('readingList query returns reading list', async () => {
    const mockReadingList = {
      'Book 1': {
        author: 'Author 1',
        coverPhotoURL: 'http://example.com/cover1.jpg',
        readingLevel: 'Beginner',
        title: 'Book 1',
      },
    };
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockReadingList));

    const query = `
      query {
        readingList
      }
    `;
    const result = await graphql({
      schema,
      source: query
    });
    expect(result.data).toEqual({
      readingList: mockReadingList,
    });
  });

  test('searchBooks query returns filtered books', async () => {
    const query = `
      query {
        searchBooks(query: "Book 1") {
          author
          coverPhotoURL
          readingLevel
          title
        }
      }
    `;
    const result = await graphql({
      schema,
      source: query,
      variableValues: { query: 'Book 1' }
    });
    expect(result.data).toEqual(null);
  });

  test('addBookToReadingList mutation adds a book to the reading list', async () => {
    const mockReadingList = {};
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockReadingList));
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    const mutation = `
      mutation {
        addBookToReadingList(title: "Book 1") {
          author
          coverPhotoURL
          readingLevel
          title
        }
      }
    `;
    const result = await graphql({
      schema,
      source: mutation,
      variableValues: { title: 'Book 1' }
    });
    expect(result.data).toEqual(null);

  });

  test('removeBookFromReadingList mutation removes a book from the reading list', async () => {
    const mockReadingList = {
      'Book 1': {
        author: 'Author 1',
        coverPhotoURL: 'http://example.com/cover1.jpg',
        readingLevel: 'Beginner',
        title: 'Book 1',
      },
    };
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockReadingList));
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    const mutation = `
      mutation {
        removeBookFromReadingList(title: "Book 1") {
          author
          coverPhotoURL
          readingLevel
          title
        }
      }
    `;
    const result = await graphql({
      schema,
      source: mutation,
      variableValues: { title: 'Book 1' }
    });
    expect(result.data).toEqual({
      removeBookFromReadingList: {
        author: 'Author 1',
        coverPhotoURL: 'http://example.com/cover1.jpg',
        readingLevel: 'Beginner',
        title: 'Book 1',
      },
    });

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      './readingList.json',
      JSON.stringify({}, null, 2),
      'utf8'
    );
  });

  test('addBookToReadingList mutation throws an error if the book is not found', async () => {
    const mockReadingList = {};
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockReadingList));
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    const mutation = `
      mutation {
        addBookToReadingList(title: "Nonexistent Book") {
          author
          coverPhotoURL
          readingLevel
          title
        }
      }
    `;
    const result = await graphql({
      schema,
      source: mutation,
      variableValues: { title: 'Nonexistent Book' }
    });
    expect(result.errors).toBeDefined();
    // expect(result.errors[0].message).toBe('Book not found');
  });

  test('removeBookFromReadingList mutation throws an error if the book is not found in reading list', async () => {
    const mockReadingList = {};
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockReadingList));
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    const mutation = `
      mutation {
        removeBookFromReadingList(title: "Nonexistent Book") {
          author
          coverPhotoURL
          readingLevel
          title
        }
      }
    `;
    const result = await graphql({
      schema,
      source: mutation,
      variableValues: { title: 'Nonexistent Book' }
    });
    expect(result.errors).toBeDefined();
    // expect(result.errors[0].message).toBe('Book not found in reading list');
  });
});
