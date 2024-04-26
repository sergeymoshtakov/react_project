import React, { useState } from 'react';
import '../styles/Books.css';

function SearchBooks({ books }) {
    const [search, setSearch] = useState({
        term: '',
        results: []
    });

    const handleSearchChange = (e) => {
        setSearch({ ...search, term: e.target.value });
    };

    const performSearch = (term) => {
        return books.filter(book => {
            return (
                book.name.toLowerCase().includes(term.toLowerCase()) ||
                book.author.toLowerCase().includes(term.toLowerCase()) ||
                book.genre.toLowerCase().includes(term.toLowerCase())
            );
        });
    };

    const handleSearch = () => {
        const results = performSearch(search.term);
        setSearch({ ...search, results: results });
    };

    const resetSearch = () => {
        setSearch({ term: '', results: [] });
    };

    return (
        <div className='search-container'>
            <input
                className="search-input"
                type="text"
                placeholder="Search by title, author, or genre"
                value={search.term}
                onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
            <button className="search-button" onClick={resetSearch}>Reset</button>

            {search.results.length > 0 && (
                <div className="search-results">
                    <h3>Search results</h3>
                    <ul className='search-results'>
                        {search.results.map((book, index) => (
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
            )}
            <br/>
            <br/>
        </div>
    );
}

export default SearchBooks;
