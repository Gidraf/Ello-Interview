import React, { useState, useEffect } from 'react';
import { Book } from './types';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import ReadingList from './components/ReadingList';
import { Container, Typography, Tabs, Tab } from '@mui/material';
import { ADD_BOOK_TO_READING_LIST, GET_BOOKS, GET_READING_LIST, REMOVE_BOOK_FROM_READING_LIST, SEARCH_BOOKS } from './graphql/Queries';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const [addBookToReadingList, { error: errorAddition }] = useMutation(ADD_BOOK_TO_READING_LIST, {
    refetchQueries: [{ query: GET_READING_LIST }],
  });

  const [removeBookFromReading, { error: errorDeletion }] = useMutation(REMOVE_BOOK_FROM_READING_LIST, {
    refetchQueries: [{ query: GET_READING_LIST }],
  });

  const [searchBooks, { loading:loadingQuery, data:dataQuery, error:errorQuery }] = useLazyQuery(SEARCH_BOOKS);

  const [fetchreadingList,{  error:readingListError, data:readingListData }] = useLazyQuery(GET_READING_LIST);

  console.log(errorAddition?.message);

  console.log(readingListData);
  
  // Fetch books from the server
  const[ fetchBooks,{ loading, error, data } ]= useLazyQuery(GET_BOOKS);

  // console.log(data);

  useEffect(() => {
    if(!searchQuery)
    {
      fetchBooks();
      if(data && data.books) {
        setBooks(data.books);
      }
    }
    else {
      searchBooks({ variables: { query:searchQuery } });
      if(dataQuery && dataQuery.books) {
        setBooks(data.books);
      }
    }
   
    fetchreadingList()
    if(readingListData && readingListData.readingList){
      const result: Book[] = []
      Object.keys(readingListData.readingList).forEach(key => {
        const value = readingListData.readingList[key];
        result.push(value)
      });
      setReadingList(result)
    }
  }, [data, loading, error, readingListData, searchQuery]);

  const addBookToReading = async (book: Book) => {
    console.log(book.title);
    const title = book.title
    try {
      await addBookToReadingList({ variables: { title } });
      await fetchreadingList()
    } catch (e) {
      console.error(e);
    }
  };

  const removeBookFromReadingList = async (title: string) => {
    console.log(title);
    try {
      await removeBookFromReading({ variables: { title } });
      await fetchreadingList()
    } catch (e) {
      console.error(e);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Book Assignment
      </Typography>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="book tabs">
        <Tab label="Books" />
        <Tab label={`Reading List ${readingList.length}`} />
      </Tabs>
      {selectedTab === 0 && (
        <>
          {searchQuery && <Typography variant="h4" gutterBottom>
            Search Results
          </Typography>}
          <BookList removeBookFromReadingList={removeBookFromReadingList} readList={ readingListData ? readingListData.readingList : {}} books={filteredBooks} addBookToReadingList={addBookToReading} />
        </>
      )}
      {selectedTab === 1 && (
        <>
          <Typography variant="h4" gutterBottom>
            Reading List
          </Typography>
          <ReadingList readingList={readingList} removeBookFromReadingList={removeBookFromReadingList} />
        </>
      )}
    </Container>
  );
};

export default App;
