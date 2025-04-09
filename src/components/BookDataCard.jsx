import { useContext } from "react"
import { BookContext } from "../context/BookProvider"
import { PieChart } from '@mui/x-charts/PieChart';

function BookDataCard(){

    const {books} = useContext(BookContext)
    const totalBooks = books.length;

    return(
        <div className="book-data-card">
                <h2>Total books: {totalBooks}</h2>
                <div className="data-container">
                    <PieChart
                        series={[
                            {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                            },
                        ]}
                        width={270}
                        height={200}
                    />  
                </div>
        </div>
    )
}

export default BookDataCard