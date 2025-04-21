import React, {useState, useEffect} from "react";
//import api from "../services/api"; // Axios

function BookForm({ selectedBook, onSave }) {
    const[title, setTitle] = useState("");
    const[author, setAuthor] = useState("");
    const[genre, setGenre] = useState("");
    const[publicationDate, setPublicationDate] = useState("");

    useEffect(() => {
        if (selectedBook) { 
            setTitle(selectedBook.title);
            setAuthor(selectedBook.author);
            setGenre(selectedBook.genre);
            setPublicationDate(selectedBook.publication_date);
        }
    }, [selectedBook]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const bookData = {
            title,
            author,
            genre,
            publication_date: publicationDate,
        };
    
        const isEdit = Boolean(selectedBook);
        const url = isEdit
            ? `http://localhost:8000/api/books/${selectedBook.id}/`
            : "http://localhost:8000/api/books/";
    
        const method = isEdit ? "PUT" : "POST";
    
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to save the book:", errorData);
                alert("Something went wrong while saving the book.");
                return;
            }
    
            const resultBook = await response.json();
            onSave(resultBook); // Refresh list & clear form
            setTitle("");
            setAuthor("");
            setGenre("");
            setPublicationDate("");
            window.location.reload();

        } catch (error) {
            console.error("Error saving book:", error);
            alert("Something went wrong while saving the book.");
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                    Title
                </label>
                <input 
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-700">
                    Author
                </label>
                <input 
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="genre" className="block text-sm font-semibold text-gray-700">
                    Genre
                </label>
                <input 
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="publicationDate" className="block text-sm font-semibold text-gray-700">
                        Publication Date
                    </label>
                    <input 
                        type="date"
                        id="publicationDate"
                        value={publicationDate}
                        onChange={(e) => setPublicationDate(e.target.value)}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
            </div>

            <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-green-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        {selectedBook ? "Update Book" : "Add Book"}
                </button>

                <button
                    type="button"
                    onClick={()=> {
                        setTitle("");
                        setAuthor("");
                        setGenre("");
                        setPublicationDate("");
                        onSave(null);
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default BookForm;