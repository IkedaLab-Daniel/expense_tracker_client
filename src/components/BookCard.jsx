import authorSVG from '../assets/author.svg'
import dateSVG from '../assets/date.svg'
import idSVG from '../assets/id.svg'

function BookCard(props) {

    const checkCategory = (num) => {
        switch (num) {
            case 1:
                return "Business Analytics"
            case 2:
                return "Deep Learning"
            case 3:
                return "Data Science"
            case 4:
                return "Maths"
            case 5:
                return "Data Ethics"
            case 6:
                return "NLP"
            case 7:
                return "Python"
            default:
                return "Others"
        }
    }

    const shortenTitle = (title) => {
        return title.length > 40 ? title.slice(0, 40) + "..." : title;
    }
    
    return (
        <div className="book-card-wrapper">
            <div className="book-card">
                <p className="book_id">
                    <img className='authorSVG' src={idSVG} />
                    {props.id}
                </p>

                <div className="book-card-center">
                    <p className="book-title">{shortenTitle(props.title)}</p>
                    <p className="book-author">
                        <img className='authorSVG' src={authorSVG} />
                        {props.authors}
                    </p>
                    <p className="book-date">
                        <img className='authorSVG' src={dateSVG} />
                        {props.published_date}
                    </p>
                </div>

                <div className="book-card-bottom">
                    <p className="book-category">{checkCategory(props.category)}</p>
                    <p className="book-expense">$ {props.expense}</p>
                </div>

            </div>
        </div>
        
    )
}

export default BookCard
