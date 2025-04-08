import { useContext, useState } from 'react'
// Images
import all_books from '../assets/all-books-w.svg'
import iceSVG from '../assets/ice.svg'
import noDataSVG from '../assets/no-data-2.svg'
// Components
import { BookContext } from '../context/BookProvider'
import BookDataCard from '../components/BookDataCard'
import BookGraphCard from '../components/BookGraphCard'
import BookCard from '../components/BookCard'
import Login from '../components/Login'

function Home(){

    const {books} = useContext(BookContext)
    const [bookCategory, setBookCategory] = useState([])
    const [showByCategory, setShowByCategory] = useState(false)
    const [viewDetail, setViewDetail] = useState('All Books')
    const [viewModal, setViewModal] = useState('none')

    console.log(books)

    const bookCategoryCall = (category) => {
        fetch('http://127.0.0.1:8000/api/books/category/' + category)
        .then(response => response.json())
        .then(data => {
            setBookCategory(data.results)
            console.log('Call at ', category)
        })  
        .catch(error => console.error('Error fetching data:', error));
        setShowByCategory(true)
        
        switch (category){
            case '1':
                setViewDetail('Business analytics:')
                break;
            case '2':
                setViewDetail('Deep learning:')
                break;
            case '3':
                setViewDetail('Data science:')
                break;
            case '4':
                setViewDetail('Mathematics:')
                break;
            case '5':
                setViewDetail('Data Ethics:')
                break;
            case '6':
                setViewDetail('NLP:')
                break;
            case '7':
                setViewDetail('Python:')
                break;
        }
    }

    const viewAll = () =>{
        setShowByCategory(false)
    }

    const renderModal = () => {
        switch (viewModal){
            case 'none':
                return ''
            case 'login':
                return <Login style={{display: 'block',}}/>
            case 'signup':
                return <h1>Sign Up</h1>
        }
    }

    const handleModal = (modal) => {
        setViewModal(modal)
    }

    return(
        <div id="home">
            <div className="side-nav">
                <p className="title">SmartShelf Systems</p>
                <p className="label">BOOKS</p>
                <div className="btn-container">
                    <div className="button-set" onClick={viewAll}>
                        <img src={all_books} className='icon' />
                        <span className="button">All</span>
                    </div>
                    <p className="label">BOOKS CATEGORY</p>
                    <div className="button-set" onClick={() => bookCategoryCall('1')}>
                        <img src={all_books} className='icon' />
                        <span className="button">Business Analytics</span>
                    </div>
                    <div className="button-set" onClick={() => bookCategoryCall('2')}>
                        <img src={all_books} className='icon' />
                        <span className="button">Deep Learning</span>
                    </div>
                    <div className="button-set" onClick={() => bookCategoryCall('3')}>
                        <img src={all_books} className='icon' />
                        <span className="button">Data Science</span>
                    </div>
                    <div className="button-set" onClick={() => bookCategoryCall('4')}>
                        <img src={all_books} className='icon' />
                        <span className="button">Mathematics</span>
                    </div>
                    <div className="button-set" onClick={() => bookCategoryCall('5')}>
                        <img src={all_books} className='icon' />
                        <span className="button">Data Ethics</span>
                    </div>
                    <div className="button-set" onClick={() => bookCategoryCall('6')}>
                        <img src={all_books} className='icon' />
                        <span className="button">NLP</span>
                    </div>
                    <div className="button-set" onClick={() => bookCategoryCall('7')}>
                        <img src={all_books} className='icon' />
                        <span className="button">Python</span>
                    </div>
                </div>
                <p className="label">EXPENSES</p>
                <div className="btn-container">
                    <div className="button-set">
                        <img src={all_books} className='icon' />
                        <span className="button">Show Data</span>
                    </div>
                </div>
                <div className='login-sign-container'>
                    <span className="login" onClick={() => handleModal('login')}>Log In</span>
                    <span className="signup" onClick={() => handleModal('signup')}>Sign Up</span>
                </div>
                <div className="copyright">
                    <img src={iceSVG} />
                    <a href='https://www.tiktok.com/@dev.iceice?is_from_webapp=1&sender_device=pc' target='_blank'>
                        <span id='ice'>@dev.iceice</span>
                    </a>
                </div>
            </div>
            <main>
                <div className="top">
                    <BookDataCard />
                    <BookGraphCard />
                </div>
                <div className="bottom">
                    <h2>{viewDetail}</h2>
                    <div className="book-card-container">
                        {showByCategory ? (
                            bookCategory.length > 0 ? (
                                bookCategory.map(book => (
                                    <BookCard 
                                        key={book.id} 
                                        id={book.id}
                                        title={book.title} 
                                        subtitle={book.subtitle}
                                        authors={book.authors}
                                        publisher={book.publisher}
                                        published_date={book.published_date}
                                        expense={book.distribution_expense}
                                        category={book.category}
                                    />
                                )) 
                            ) :
                            (<div className='no-data-container'>
                                <img src={noDataSVG} />
                                <span className='no-data'>No data</span>
                            </div>)
                        )  
                            : 
                            books.map(book => (
                                <BookCard 
                                    key={book.id} 
                                    id={book.id}
                                    title={book.title} 
                                    subtitle={book.subtitle}
                                    authors={book.authors}
                                    publisher={book.publisher}
                                    published_date={book.published_date}
                                    expense={book.distribution_expense}
                                    category={book.category}
                                />
                            ))
                        }
                    </div>
                </div>
            </main>
            {renderModal()}
        </div>
    )
}

export default Home