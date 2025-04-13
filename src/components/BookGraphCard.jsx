import { useState, useContext } from 'react';
import { ExpenseContext } from "../context/ExpenseProvider";

function BookGraphCard() {
    const { categoryExpenses } = useContext(ExpenseContext);

    // Map category IDs to their names
    const getCategoryName = (num) => {
        const categoryMap = {
            1: "Business Analytics",
            2: "Deep Learning",
            3: "Data Science",
            4: "Mathematics",
            5: "Data Ethics",
            6: "NLP",
            7: "Python",
        };
        return categoryMap[num] || "Unknown";
    };

    return (
        <div className="book-graph-card">
            <div className="expense-data-wrapper">
                <div className="left">
                    <ul>
                        {categoryExpenses.map((expense) => (
                            <li key={expense.category__id}>
                                    {getCategoryName(expense.category__id)}
                            </li>
                        ))}
                    </ul> 
                </div>
                <div className="right">
                    <ul>
                        {categoryExpenses.map((expense) => (
                            <li key={expense.category__id}>
                                ${expense.total_expense.toFixed(2)}
                            </li>
                        ))}
                    </ul> 
                </div>
            </div>
            
            
        </div>
    );
}

export default BookGraphCard;