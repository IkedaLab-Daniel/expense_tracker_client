import React, { createContext, useState, useEffect } from 'react';

export const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/books/')
      .then(response => response.json())
      .then(data => setBooks(data.results))  
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    // Provide the context to the children components
    <BookContext.Provider value={{ books }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
