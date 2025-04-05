import { useEffect, useState } from 'react'
import all_books from '../assets/all-books-w.svg'
import BookDataCard from '../components/BookDataCard'
import BookGraphCard from '../components/BookGraphCard'

function Home(){
    
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/books')
        .then(response => response.json)
        .then(data => setBooks(data))
        .catch(error => console.log(error))
    }, []);

    return(
        <div id="home">
            <div className="side-nav">
                <p className="title">SmartShelf Systems</p>
                <p className="label">BOOKS</p>
                <div className="btn-container">
                    <div className="button-set">
                        <img src={all_books} className='icon' />
                        <span className="button">All</span>
                    </div>
                    <p className="label">BOOKS CATEGORY</p>
                    <div className="button-set">
                        <img src={all_books} className='icon' />
                        <span className="button">Business Analytics</span>
                    </div>
                    <div className="button-set">
                        <img src={all_books} className='icon' />
                        <span className="button">Deep Learning</span>
                    </div>
                    <div className="button-set">
                        <img src={all_books} className='icon' />
                        <span className="button">Data Science</span>
                    </div>
                    <div className="button-set">
                        <img src={all_books} className='icon' />
                        <span className="button">Mathematics</span>
                    </div>
                    <div className="button-set">
                        <img src={all_books} className='icon' />
                        <span className="button">Data Ethics</span>
                    </div>
                    <div className="button-set">
                        <img src={all_books} className='icon' />
                        <span className="button">NLP</span>
                    </div>
                    <div className="button-set">
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
                    <span className="login">Log In</span>
                    <span className="signup">Sign Up</span>
                </div>
            </div>
            <main>
                <div className="top">
                    <BookDataCard />
                    <BookGraphCard />
                </div>
                <div className="bottom">
                    Book Data here
                    <h1>Sample Call:</h1>
                    <p>All Books:</p>
                </div>
                
            </main>
        </div>
    )
}

export default Home