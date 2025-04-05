import { useContext, useEffect, useState } from 'react'
import all_books from '../assets/all-books-w.svg'
import { BookContext } from '../context/BookProvider'
import BookDataCard from '../components/BookDataCard'
import BookGraphCard from '../components/BookGraphCard'
import BookCard from '../components/BookCard'
function Home(){

    const {books} = useContext(BookContext)
    console.log(books)

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
                    Book Data here:
                    <div className="book-card-container">
                        {books.map(book => {
                            return (
                                <BookCard 
                                    key={book.id} 
                                    id={book.id}
                                    title={book.title} 
                                    subtitle = {book.subtitle}
                                    authors = {book.authors}
                                    publisher = {book.publisher}
                                    published_date = {book.published_date}
                                    expense = {book.distribution_expense}
                                    category = {book.category}
                                />
                            );
                        })}
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default Home