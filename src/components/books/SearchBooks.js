import React, { PureComponent } from 'react';
import '../styles/Books.css';

class SearchBooks extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: []
        };
    }

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    performSearch = (term) => {
        const { books } = this.props;
        return books.filter(book => {
            return (
                book.name.toLowerCase().includes(term.toLowerCase()) ||
                book.author.toLowerCase().includes(term.toLowerCase()) ||
                book.genre.toLowerCase().includes(term.toLowerCase())
            );
        });
    };

    handleSearch = () => {
        const { searchTerm } = this.state;
        const results = this.performSearch(searchTerm);
        this.setState({ searchResults: results });
    };

    resetSearch = () => {
        this.setState({ searchTerm: '', searchResults: [] });
    };

    render() {
        const { searchTerm, searchResults } = this.state;

        return (
            <div className='search-container'>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by title, author, or genre"
                    value={searchTerm}
                    onChange={this.handleSearchChange}
                />
                <button className="search-button" onClick={this.handleSearch}>Search</button>
                <button className="search-button" onClick={this.resetSearch}>Reset</button>

                {searchResults.length > 0 && (
                    <div className="search-results">
                        <h3>Search results</h3>
                        <ul className='search-results'>
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
                )}
                <br/>
                <br/>
            </div>
        );
    }
}

export default SearchBooks;