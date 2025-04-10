import { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
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
import Signup from '../components/Signup';

function Home(){

    const { books, categoryBooks, currentCategory, pagination, setCurrentCategory, fetchBooks, fetchBooksByCategory } = useContext(BookContext);
// !    const [bookCategory, setBookCategory] = useState([])
// !    const [showByCategory, setShowByCategory] = useState(false)
    const [viewDetail, setViewDetail] = useState('All Books')
    const [viewModal, setViewModal] = useState('none')
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [count, setCount] = useState(1)
    const [username, setUsername] = useState(localStorage.getItem('username'))

    const logoutSuccess = () => toast.success('Logged Out!', {
        position: 'top-center',
        style: {padding: '15px 15px'}
    });

    console.log(books)

    const bookCategoryCall = (category) => {
        if (currentCategory === category) return;
        fetchBooksByCategory(category);
        
        const categoryMap = {
            '1': 'Business Analytics:',
            '2': 'Deep Learning:',
            '3': 'Data Science:',
            '4': 'Mathematics:',
            '5': 'Data Ethics:',
            '6': 'NLP:',
            '7': 'Python:',
        };

        setViewDetail(categoryMap[category] || 'All Books:');
        setCount(prev => (prev + 1))
    }

    const viewAll = () =>{
        fetchBooks();
        setViewDetail('All books:')
        setCurrentCategory(null);
    }

    const renderModal = () => {
        console.log('Switch modal')
        switch (viewModal){
            case 'none':
                return null
            case 'login':
                return <Login
                    onClose={() => setViewModal('none')}
                    onSwitch={() => setViewModal('signup')}
                    onLoginSuccess={(username) => {
                        setUsername(username);
                        setToken(localStorage.getItem('authToken'));
                    }}
                    />
            case 'signup':
                return <Signup onClose={() => setViewModal('none')} onSwitch={() => setViewModal('login')}/>
            default:
                return null
        }
    }
    
    const handleModal = (modal) => {
        setViewModal(modal)
    }

    const handleLogout = () => {
        const token = localStorage.getItem('authToken');
    
        fetch('http://127.0.0.1:8000/auth/token/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
        .then(() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            setToken('')
            setUsername('')
            logoutSuccess()
        })
        .catch(error => console.error('Error logging out:', error));
    };

    const getBookId = (id) => {
        console.log(id);
    }

    useEffect(() => {
        setToken(localStorage.getItem('authToken'))
        setUsername(localStorage.getItem('username'))
    }, [viewModal])
    

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
                { !token ? (
                    <div className='login-sign-container'>
                        <span className="login" onClick={() => handleModal('login')}>Log In</span>
                        <span className="signup" onClick={() => handleModal('signup')}>Sign Up</span>
                    </div>
                ) : (
                    <div className='login-sign-container'>
                        <p>Login as: {username}</p>
                        <span className="logout" onClick={handleLogout}>Log Out</span>
                    </div>
                )}
                
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
                    <h2 key={count}>{viewDetail}</h2>
                    <div className="book-card-container">
                    {currentCategory ? (
                        categoryBooks.length > 0 ? (
                            categoryBooks.map(book => (
                                <div key={book.id} onClick={() => getBookId(book.id)}>
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
                                </div>
                                
                            ))
                        ) : (
                            <div className='no-data-container'>
                                <img src={noDataSVG} />
                                <span className='no-data'>No data</span>
                            </div>
                        )
                    ) : (
                        books.length > 0 ? (
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
                                    onClick={() => getBookId(book.id)}
                                />
                            ))
                        ) : (
                            <div className='no-data-container'>
                                <img src={noDataSVG} />
                                <span className='no-data'>No data</span>
                            </div>
                        )
                    )}
                    </div>
                </div>
            </main>
            {renderModal()}
            <Toaster />
        </div>
    )
}

export default Home