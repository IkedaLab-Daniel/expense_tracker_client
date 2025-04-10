import React, { createContext, useState, useEffect } from 'react';

export const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    count: 0,
    currentPage: 1,
  });
  const [currentCategory, setCurrentCategory] = useState(null);

  // Fetch all books for a given page
  const fetchBooks = (page = 1) => {
    fetch(`http://localhost:8000/api/books/?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.results);
        setPagination({
          next: data.next,
          previous: data.previous,
          count: data.count,
          currentPage: page,
        });
        const categoryCount = {};
          data.results.forEach(book => {
          const cat = book.category || 'Unknown';
          categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });
        const stats = Object.entries(categoryCount).map(([label, value], id) => ({
          id,
          label,
          value
        }));

        setCategoryStats(stats);
      })
      .catch(error => console.error('Error fetching books:', error));
  };

  // Fetch books for a specific category
  const fetchBooksByCategory = (categoryId, page = 1) => {
    setCurrentCategory(categoryId);
    fetch(`http://localhost:8000/api/books/category/${categoryId}?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setCategoryBooks(data.results);
        setPagination({
          next: data.next,
          previous: data.previous,
          count: data.count,
          currentPage: page,
        });
      })
      .catch(error => console.error('Error fetching category books:', error));
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{
      books,
      categoryBooks,
      currentCategory,
      pagination,
      fetchBooks,
      fetchBooksByCategory,
      setCurrentCategory,
      categoryStats,
    }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
