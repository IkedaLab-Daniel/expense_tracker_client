import { useState, useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { ExpenseContext } from "../context/ExpenseProvider";
import closeSVG from '../assets/close.svg'
function AddModal({ onClose, onRefresh }) {
    const { fetchAllExpenses, fetchExpensesByCategory } = useContext(ExpenseContext)
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [distributionExpense, setDistributionExpense] = useState('');
    const [category, setCategory] = useState('');
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    const handleSubmit= (close) => {
        const bookData = {
            id,
            title,
            subtitle,
            authors,
            publisher,
            published_date: publishDate,
            distribution_expense: distributionExpense,
            category,
        };
    
        console.log('Payload:', bookData);
        console.log('Payload (stringified):', JSON.stringify(bookData));
    
        // Perform the POST request HERE
        fetch('https://expense-tracker-7oow.onrender.com/api/books/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`, 
            },
            body: JSON.stringify(bookData),
        })
            .then((response) => {
                if (!response.ok) {
                    // ? First: Parse the error response
                    return response.json().then((err) => {
                        console.error('Backend error:', err);
    
                        // ? Second: Extract and format DRF validation errors (CURRENTLY WORKING!)
                        const errorMessages = Object.entries(err)
                            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                            .join('\n');
    
                        throw new Error(errorMessages || 'Failed to add the book');
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Book added successfully:', data);
                toast.success('Book added successfully!');
                onRefresh()
                fetchAllExpenses()
                fetchExpensesByCategory()
                if (close){
                    onClose();
                } else{
                    setId('');
                    setTitle('');
                    setSubtitle('');
                    setAuthors('');
                    setPublisher('');
                    setPublishDate('');
                    setDistributionExpense('');
                    setCategory('');
                }
            })
            .catch((error) => {
                console.error('Error adding book:', error.message);
                toast.error(error.message || 'Failed to add the book. Please try again.');
            });
    };

    return (
        <>
            <div className="black-bg" onClick={onClose}></div>
            <div className="login-modal form">
                <img className="closeSVG" src={closeSVG} onClick={onClose}/>
                <h1>Add Book</h1>
                <div className="vertical-center">
                    <input 
                        type="number"
                        placeholder="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="num-no-toolkit"
                    />
                    <input 
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Authors"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />
                    <input 
                        type="date"
                        placeholder="Publish Date"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                    />
                    <input 
                        type="number"
                        placeholder="Distribution Expense"
                        value={distributionExpense}
                        onChange={(e) => setDistributionExpense(e.target.value)}
                    />
                    <select 
                        className="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="1">Business Analytics</option>
                        <option value="2">Deep Learning</option>
                        <option value="3">Data Science</option>
                        <option value="4">Mathematics</option>
                        <option value="5">Data Ethics</option>
                        <option value="6">NLP</option>
                        <option value="7">Python</option>
                    </select>
                    
                    <div className="dual-btn">
                        <button className="submit-btn" onClick={() => handleSubmit(true)}>Save</button>
                        <button className="submit-btn" onClick={() => handleSubmit(false)}>Save and Add another</button>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default AddModal;