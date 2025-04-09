import { useContext } from "react"
import { BookContext } from "../context/BookProvider"

function BookDataCard(){

    const {books} = useContext(BookContext)
    const totalBooks = books.length;

    return(
        <div className="book-data-card">
                <h2>Total books: {totalBooks}</h2>
                <div className="data-container">
                    <div className="data-left">
                        left
                    </div>
                    <div className="data-right">
                        right
                    </div>
  
                </div>
        </div>
    )
}

export default BookDataCard