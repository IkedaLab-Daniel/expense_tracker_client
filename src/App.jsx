import Home from './pages/Home'
import './App.css'
import BookProvider from './context/BookProvider'
import ExpenseProvider from './context/ExpenseProvider'

function App() {
  return (
    <>
      <BookProvider>
        <ExpenseProvider>
          <Home />
        </ExpenseProvider>
      </BookProvider>
    </>
  )
}

export default App
