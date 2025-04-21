import React, {useState, useEffect} from "react";
import api from "..services/api"; // Axios

function BookForm({ selectedBook, onSave }) {
    const[title, setTitle] = useState("");
    const[author, setAuthor] = useState("");
    const[genre, setGenre] = useState("");
    const[pubicationDate, setPublicationDate] = useState("");

    useEffect(() => {
        if (selectedBook) { 
            setTitle(selectedBook.title);
            setAuthor(selectedBook.author);
            setGenre(setGenre.genre);
            setPublicationDate(selectedBook.pubication_date);
        }
    }, [selectedBook]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {title, author, genre, publication_date: pubicationDate};

        if (selectedBook) { 
            await api.put(`/books/${selectedBook.id}`, bookData);
        } else { 
            await api.post("/books/", bookData);
        }
        onSave();
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
                        type="text"
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
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {selectedBook ? "Update Book" : "Add Book"}
                </button>

                <button
                    type="button"
                    onClick={onSave}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default BookForm;