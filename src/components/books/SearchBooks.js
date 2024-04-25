// SearchBooks.js
import React, { useState } from 'react';
import '../styles/Books.css';

function SearchBooks({ books }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const results = books.filter(book => {
            return (
                book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.genre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setSearchResults(results);
    };

    const resetSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    return (
        <div className='search-container'>
            <input
                className="search-input"
                type="text"
                placeholder="Search by title, author, or genre"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
            <button className="search-button" onClick={resetSearch}>Reset</button>

            <div className="search-results">
                <h2>Search Results</h2>
                <ul>
                    {searchResults.map((book, index) => (
                        <li key={index}>
                            <h3>{book.name}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <p><strong>Year:</strong> {book.year}</p>
                            <p>{book.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchBooks;