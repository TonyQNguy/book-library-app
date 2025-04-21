import React, {useState, useEffect} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookForm from "./components/BookForm";
import BookCarousel from "./components/BookCarousel";
import api from "./services/api";
import './index.css';

function App() {
  const [editingBook, setEditingBook] = useState(null);
  const [books, setBooks] = useState([]);

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
        const response = await api.get("/books/");
        setBooks(response.data);
    } catch (error) {
        console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleSave = () => {
    setEditingBook(null);
  };

  const handleDelete = (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    
    if (confirmDelete) {
      // Remove the book from the list based on its ID
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    }
  };
  

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-green-800">My Book Library</h1>
        <BookForm selectedBook={editingBook} onSave={handleSave} />
        <hr className="my-6" />
        <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Explore Your Books</h2>
        <BookCarousel books={books} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
