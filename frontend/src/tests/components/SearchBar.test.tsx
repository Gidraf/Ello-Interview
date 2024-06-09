import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from '../../components/SearchBar';


describe('SearchBar Component', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <SearchBar
        searchQuery=""
        setSearchQuery={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the search input field with the correct label', () => {
    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={() => {}}
      />
    );

    expect(screen.getByLabelText('Search Books')).toBeInTheDocument();
  });

  it('should display the correct initial value in the search input field', () => {
    render(
      <SearchBar
        searchQuery="Initial Query"
        setSearchQuery={() => {}}
      />
    );

    expect(screen.getByDisplayValue('Initial Query')).toBeInTheDocument();
  });

  it('should call setSearchQuery with the new value when the input changes', () => {
    const setSearchQuery = jest.fn();

    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={setSearchQuery}
      />
    );

    const input = screen.getByLabelText('Search Books');
    fireEvent.change(input, { target: { value: 'New Query' } });
    expect(setSearchQuery).toHaveBeenCalledWith('New Query');
  });
});
