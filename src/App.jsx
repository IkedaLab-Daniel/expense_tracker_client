import Home from './pages/home'
import './App.css'
import BookProvider from './context/BookProvider'

function App() {
  return (
    <>
      <BookProvider>
        <Home />
      </BookProvider>
    </>
  )
}

export default App
