import authorSVG from '../assets/author.svg'
import dateSVG from '../assets/date.svg'
import idSVG from '../assets/id.svg'
import checkmarkSVG from '../assets/checkmark.svg'

function BookCard({ id, title, authors, published_date, category, expense, isSelected, onSelect }) {

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

    const token = localStorage.getItem('authToken')
    
    return (
        <div className="book-card-wrapper" onClick={onSelect} style={{ position: 'relative' }}>
            <div className={`book-card ${isSelected ? 'selected' : ''}`}>
                <p className="book_id">
                    <img className='authorSVG' src={idSVG} />
                    {id}
                </p>

                <div className="book-card-center">
                    <p className="book-title">{shortenTitle(title)}</p>
                    <p className="book-author">
                        <img className='authorSVG' src={authorSVG} />
                        {authors}
                    </p>
                    <p className="book-date">
                        <img className='authorSVG' src={dateSVG} />
                        {published_date}
                    </p>
                </div>

                <div className="book-card-bottom">
                    <p className="book-category">{checkCategory(category)}</p>
                    <p className="book-expense">$ {expense}</p>
                </div>

                {isSelected && token ? (<img src={checkmarkSVG} className='checkmark' />) : ('')}
                
            </div>
        </div>
        
    )
}

export default BookCard
