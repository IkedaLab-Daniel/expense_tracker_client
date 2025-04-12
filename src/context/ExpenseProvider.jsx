import React, { createContext, useState, useEffect } from "react";

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
    const [allExpenses, setAllExpenses] = useState([]);
    const [categoryExpenses, setCategoryExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllExpenses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/books/expenses/');
            if (!response.ok) {
                throw new Error('Failed to fetch all expenses');
            }
            const data = await response.json();
            setAllExpenses(data);
        } catch (err) {
            console.error('Error fetching all expenses:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchExpensesByCategory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/books/expenses/category/');
            if (!response.ok) {
                throw new Error('Failed to fetch expenses by category');
            }
            const data = await response.json();
            setCategoryExpenses(data);
        } catch (err) {
            console.error('Error fetching expenses by category:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllExpenses(); 
        fetchExpensesByCategory();
    }, []);

    return (
        <ExpenseContext.Provider
            value={{
                allExpenses,
                categoryExpenses,
                fetchAllExpenses,
                fetchExpensesByCategory,
                loading,
                error,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseProvider;