import React from "react";

function BookCard({ book, onEdit, onDelete }) {
    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h3>
            <p className="mt-2 text-gray-800"><span className="font-semibold">Author:</span> {book.author}</p>
            <p className="text-gray-600"><span className="font-semibold">Genre:</span> {book.genre}</p>
            <p className="text-gray-500 mb-4"><span className="font-semibold">Published:</span> {book.publication_date}</p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => onEdit(book)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(book.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default BookCard;
