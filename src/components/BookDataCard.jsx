import { useContext } from "react";
import { BookContext } from "../context/BookProvider";
import { PieChart } from '@mui/x-charts/PieChart';

function BookDataCard() {
    const { books = [], categoryStats = [] } = useContext(BookContext);
    const totalBooks = books.length;
    console.log('CategoryStats:', categoryStats)
    console.log('Books:', books)
    return (
        <div className="book-data-card">
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
                    legend={{ hidden: true }}  // ! Remove for now
                    />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        </div>
    );
}

export default BookDataCard;
