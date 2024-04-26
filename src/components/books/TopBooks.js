import React, { Component } from 'react';
import '../styles/TopBooks.css';

class TopBooks extends Component {
    state = {
        searchGenre: '',
        searchAuthor: '',
        genreResults: [],
        authorResults: []
    };

    getTopBooksOverall = () => {
        const { books } = this.props;
        return books;
    };

    handleSearch = (type) => {
        const { searchGenre, searchAuthor } = this.state;
        let results;
        if (type === 'genre') {
            results = this.getTopBooksByGenre(searchGenre);
            this.setState({ genreResults: results });
        } else {
            results = this.getTopBooksByAuthor(searchAuthor);
            this.setState({ authorResults: results });
        }
    };

    getTopBooksByGenre = (genre) => {
        const { books } = this.props;
        return books.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()))
                    .slice(0, 10);
    };

    getTopBooksByAuthor = (author) => {
        const { books } = this.props;
        return books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()))
                    .slice(0, 3);
    };

    renderResults = (results) => {
        return (
            <ul>
                {results.map((book, index) => (
                    <li key={index} className="book-item">
                        <span>{book.name} by {book.author}</span>
                        <span className="read-count">{book.readCount} views</span>
                    </li>
                ))}
            </ul>
        );
    };

    render() {
        const { searchGenre, searchAuthor, genreResults, authorResults } = this.state;

        return (
            <div className="top-books-container">
                <h2>Top 10 Books Overall</h2>
                {this.renderResults(this.getTopBooksOverall())}

                <h2>Top 10 Books by Genre</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Enter Genre"
                        value={searchGenre}
                        onChange={(e) => this.setState({ searchGenre: e.target.value })}
                    />
                    <button onClick={() => this.handleSearch('genre')}>Search</button>
                </div>
                {this.renderResults(genreResults)}

                <h2>Top 3 Books by Author</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Enter Author"
                        value={searchAuthor}
                        onChange={(e) => this.setState({ searchAuthor: e.target.value })}
                    />
                    <button onClick={() => this.handleSearch('author')}>Search</button>
                </div>
                {this.renderResults(authorResults)}
            </div>
        );
    }
}

export default TopBooks;