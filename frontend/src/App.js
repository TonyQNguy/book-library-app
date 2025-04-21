import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

function App() {
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => setEditingBook(book);
  const handleSave = () => setEditingBook(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">My Book Library</h1>
        <BookForm selectedBook={editingBook} onSave={handleSave}/>
        <hr className="my-6" />
        <BookList onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default App;
