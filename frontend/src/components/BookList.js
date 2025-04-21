import React, {useState, useEffect} from "react";
import api from "../services/api"; // Axios

function BookList({ onEdit }) { 
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await api.get("/books/");
            setBooks(response.data);
        };
        fetchBooks();
    }, [books]); // Refetch after adding/deleting

    const handleDelete = async (id) => { 
        await api.delete(`/books/${id}/`);
        setBooks(books.filter((book) => book.id !== id));
    };

    return (
        <div className="space-y-4">
            {books.length === 0 ? (
                <p className="text-center text-gray-500">No books available</p>
            ) : (
                books.map((book) => (
                   <div key={book.id} className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-gray-700">Author: {book.author}</p>
                    <p className="text-gray-500">Author: {book.genre}</p> 
                    <p className="text-gray-500">Author: {book.publication_date}</p>
                    <div className="flex space-x-4 mt-2">
                        <button
                            onClick={() => onEdit(book)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
                        >
                            onEdit
                        </button>
                        <button
                            onClick={() => handleDelete(book.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                ))
            )}
        </div>
    );
}

export default BookList;