function BookCard(props){

    const checkCategory = (num) => {
        if (num === 1){
            return "Business Analytics"
        }
    }

    return(
        <div className="book-card">
            <p className="book_id">{props.id}</p>
            <p className="book-title">{props.title}</p>
            <p className="book-author">By: {props.authors}</p>
            <p className="book-date">{props.published_date}</p>
            <div className="book-card-bottom">
                <p className="book-category">{checkCategory(props.category)}</p>
                <p className="book-expense">$ {props.expense}</p>
            </div>
            
        </div>
    )
}

export default BookCard