import { useContext } from "react";
import { BookContext } from "../context/BookProvider";
import { ExpenseContext } from "../context/ExpenseProvider";
import { PieChart } from '@mui/x-charts/PieChart';

function BookDataCard() {
    const { categoryStats = [], totalBooks } = useContext(BookContext);
    const { categoryExpenses, allExpenses } = useContext(ExpenseContext);

    // Helper function to map category IDs to names
    const getCategoryName = (id) => {
        const categoryMap = {
            1: "Business Analytics",
            2: "Deep Learning",
            3: "Data Science",
            4: "Mathematics",
            5: "Data Ethics",
            6: "NLP",
            7: "Python",
        };
        return categoryMap[id] || "Unknown";
    };

    const categoryExpenseData = categoryExpenses.map((expense) => ({
        id: expense.category__id,
        label: getCategoryName(expense.category__id),
        value: expense.total_expense,
    }));

    return (
        <div className="book-data-card">
            <div className="left">
                    <h2>Total books: {totalBooks}</h2>
                    <div className="data-container">
                        {categoryStats.length > 0 ? (
                            <PieChart
                                series={[
                                    {
                                        data: categoryStats,
                                    },
                                ]}
                                width={270}
                                height={200}
                                legend={{ hidden: true }}
                            />
                        ) : (
                            <p>Loading chart...</p>
                        )}
                    </div>
            </div>

            <div className="right">
                    <h2>Total Expenses: {allExpenses.total_expenses}</h2>
                    <div className="data-container">
                        {categoryExpenseData.length > 0 ? (
                            <PieChart
                                series={[
                                    {
                                        data: categoryExpenseData,
                                    },
                                ]}
                                width={270}
                                height={200}
                                legend={{ hidden: true }}
                            />
                        ) : (
                            <p>Loading chart...</p>
                        )}
            </div>
            
            
            </div>
        </div>
    );
}

export default BookDataCard;