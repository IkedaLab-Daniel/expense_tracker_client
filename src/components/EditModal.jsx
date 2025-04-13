import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { BookContext } from '../context/BookProvider'
import { ExpenseContext } from "../context/ExpenseProvider";

function EditModal({ book, onClose }) {
  const [title, setTitle] = useState(book?.title || "");
  const [subtitle, setSubtitle] = useState(book?.subtitle || "");
  const [authors, setAuthors] = useState(book?.authors || "");
  const [publisher, setPublisher] = useState(book?.publisher || "");
  const [publishDate, setPublishDate] = useState(book?.published_date || "");
  const [distributionExpense, setDistributionExpense] = useState(book?.distribution_expense || "");
  const [category, setCategory] = useState(book?.category || "");
  const { fetchBooks } = useContext(BookContext);
  const { fetchAllExpenses, fetchExpensesByCategory } = useContext(ExpenseContext)
  const token = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const updatedBookData = {
      title,
      subtitle,
      authors,
      publisher,
      published_date: publishDate,
      distribution_expense: distributionExpense,
      category,
    };

    // ? Perform the PATCH request (NEED TO REMOVE "/" at the end of endpont)
    // ! Need fix endpoint to add "/" in the end 
    fetch(`https://expense-tracker-7oow.onrender.com/api/books/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(updatedBookData),
    })
      .then((response) => {
        if (!response.ok) {
          // Parse and handle DRF validation errors
          return response.json().then((err) => {
            console.error("Backend error:", err);
            const errorMessages = Object.entries(err)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("\n");
            throw new Error(errorMessages || "Failed to update the book");
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Book updated successfully!");
        fetchBooks(); 
        onClose(); 
        fetchAllExpenses();
        fetchExpensesByCategory();
      })
      .catch((error) => {
        console.error("Error updating book:", error.message);
        toast.error(error.message || "Failed to update the book. Please try again.");
      });
  };

  return (
    <div className="login-modal form">
        <h1>Edit Book</h1>
        <div className="vertical-center">
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
                <button className="submit-btn" onClick={handleSubmit}>Update</button>
                <button className="submit-btn" onClick={onClose}>
                Cancel
            </button>
            </div>
      </div>
    </div>
  );
}

export default EditModal;