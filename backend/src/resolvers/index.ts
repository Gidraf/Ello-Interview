import fs from 'fs';
import { booksData } from '../data/books';

const READING_LIST_FILE = './readingList.json';


export interface BookDto {
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  title: string;
}


// Helper function to read the reading list from the JSON file
const readReadingList = () => {
  if (fs.existsSync(READING_LIST_FILE)) {
    const data = fs.readFileSync(READING_LIST_FILE, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

// Helper function to write the reading list to the JSON file
const writeReadingList = (readingList: object) => {
  fs.writeFileSync(READING_LIST_FILE, JSON.stringify(readingList, null, 2), 'utf8');
};

export const resolvers = {
  Query: {
    books: () => booksData,
    readingList: () => { const data = readReadingList(); return data;},
    searchBooks: ({ query }: { query: string }) => {
      return booksData.filter(
        book =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      );
    },
  },
  Mutation: {
    addBookToReadingList: (_:string, title:{title:string}) => {
      const bookToAdd = booksData.find(book => book.title === title.title);
      if (!bookToAdd) throw new Error('Book not found');

      const readingList = readReadingList();
      readingList[title.title] = bookToAdd;
      writeReadingList(readingList);

      return bookToAdd;
    },
    removeBookFromReadingList: (_:string,{ title }: { title: string }) => {
     
      const readingList = readReadingList();
      const bookToRemove = readingList[title];
      if (!bookToRemove) {throw new Error('Book not found in reading list');}
      
      
      delete readingList[title];

      writeReadingList(readingList);

      return bookToRemove;
    },
  },
};

