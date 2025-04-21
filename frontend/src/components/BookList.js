import React, {useState, useEffect} from "react";
import api from "../services/api"; // Axios
import BookCard from "./BookCard";

function BookList({ onEdit }) { 
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await api.get("/books/");
            setBooks(response.data);
        };
        fetchBooks();
    }, []); // Refetch after adding/deleting

    const handleDelete = async (id) => { 
        await api.delete(`/books/${id}/`);
        setBooks(books.filter((book) => book.id !== id));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {books.length === 0 ? (
                <p className="text-center text-gray-500 col-span-full">No books available</p>
            ) : (
                books.map((book) => (
                    <BookCard 
                        key={book.id} 
                        book={book} 
                        onEdit={onEdit} 
                        onDelete={handleDelete} 
                    />
                ))
            )}
        </div>
    );
}

export default BookList;