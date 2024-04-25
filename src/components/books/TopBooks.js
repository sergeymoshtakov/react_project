import React, { useState } from 'react';

function TopBooks({ books }) {
    const [searchGenre, setSearchGenre] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');
    const [genreResults, setGenreResults] = useState([]);
    const [authorResults, setAuthorResults] = useState([]);

    const getTopBooksOverall = () => {
        return books.sort((a, b) => b.readCount - a.readCount).slice(0, 10);
    };

    const getTopBooksByGenre = (genre) => {
        return books.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()))
                    .sort((a, b) => b.readCount - a.readCount)
                    .slice(0, 10);
    };

    const getTopBooksByAuthor = (author) => {
        return books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()))
                    .sort((a, b) => b.readCount - a.readCount)
                    .slice(0, 3);
    };

    const handleGenreSearch = () => {
        setGenreResults(getTopBooksByGenre(searchGenre));
    };

    const handleAuthorSearch = () => {
        setAuthorResults(getTopBooksByAuthor(searchAuthor));
    };

    return (
        <div className="top-books-container">
            <h2>Top 10 Books Overall</h2>
            <ul>
                {getTopBooksOverall().map((book, index) => (
                    <li key={index}>{book.name} by {book.author}</li>
                ))}
            </ul>

            <h2>Top 10 Books by Genre</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter Genre"
                    value={searchGenre}
                    onChange={(e) => setSearchGenre(e.target.value)}
                />
                <button onClick={handleGenreSearch}>Search</button>
            </div>
            <ul>
                {genreResults.map((book, index) => (
                    <li key={index}>{book.name} by {book.author}</li>
                ))}
            </ul>

            <h2>Top 3 Books by Author</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter Author"
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value)}
                />
                <button onClick={handleAuthorSearch}>Search</button>
            </div>
            <ul>
                {authorResults.map((book, index) => (
                    <li key={index}>{book.name} by {book.author}</li>
                ))}
            </ul>
        </div>
    );
}

export default TopBooks;