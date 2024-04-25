import React, { useState, useEffect  } from 'react';
import Book from './Book';
import SearchBooks from './SearchBooks';
import TopBooks from './TopBooks'; 
import '../styles/Books.css';

function Books() {
    const [books, setBooks] = useState([
        {
            name: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            genre: 'Fiction',
            year: 1960,
            text: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.'
        },
        {
            name: '1984',
            author: 'George Orwell',
            genre: 'Dystopian fiction',
            year: 1949,
            text: 'A dystopian social science fiction novel and cautionary tale.'
        },
        {
            name: 'Pride and Prejudice',
            author: 'Jane Austen',
            genre: 'Romance',
            year: 1813,
            text: 'A novel of manners first published in 1813. The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.'
        },
        {
            name: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            genre: 'Bildungsroman',
            year: 1951,
            text: 'A novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.'
        },
        {
            name: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Tragedy',
            year: 1925,
            text: 'A novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.'
        }
    ]);

    const [newBook, setNewBook] = useState({
        name: '',
        author: '',
        genre: '',
        year: '',
        text: null,
    });

    const [errors, setErrors] = useState({
        name: '',
        author: '',
        genre: '',
        year: '',
        text: '',
    });

    const [sortedBooks, setSortedBooks] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
        if (name !== 'text') {
            validateField(name, value);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewBook({ ...newBook, text: file });
        validateField('text', file);
    };

    const handleReadCountChange = (index, newReadCount) => {
        const updatedBooks = [...books];
        updatedBooks[index].readCount = newReadCount;
        console.log(updatedBooks[index].readCount);
        setBooks(updatedBooks);
    };

    useEffect(() => {
        setSortedBooks(books.slice().sort((a, b) => b.readCount - a.readCount));
        console.log('we are here');
    }, [books]);

    const validateField = (fieldName, value) => {
        let errorMessage = '';
        switch (fieldName) {
            case 'name':
            case 'author':
            case 'genre':
                if (value.trim().length < 1 || value.trim().length > 50) {
                    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be between 1 and 50 characters.`;
                }
                break;
            case 'year':
                const yearNumber = parseInt(value);
                if (isNaN(yearNumber) || yearNumber < 0 || yearNumber > 2024) {
                    errorMessage = 'Please enter a valid year between 0 and 2024.';
                }
                break;
            case 'text':
                if (!value) {
                    errorMessage = 'Please select a file.';
                }
                break;
            default:
                break;
        }
        setErrors({ ...errors, [fieldName]: errorMessage });
    };

    const addBook = () => {
        const { name, author, genre, year, text } = newBook;
        let hasError = false;

        if (!name.trim() || !author.trim() || !genre.trim() || !year.trim() || !text) {
            setErrors({
                name: !name.trim() ? 'Name cannot be empty.' : '',
                author: !author.trim() ? 'Author cannot be empty.' : '',
                genre: !genre.trim() ? 'Genre cannot be empty.' : '',
                year: !year.trim() ? 'Year cannot be empty.' : '',
                text: !text ? 'Please select a file.' : '',
            });
            hasError = true;
        }

        if (!hasError) {
            const newBooks = [...books, newBook];
            setBooks(newBooks);
            setNewBook({
                name: '',
                author: '',
                genre: '',
                year: '',
                text: null,
            });
            setErrors({ name: '', author: '', genre: '', year: '', text: '' });
        }
    };

    const handleSave = (index, updatedBook) => {
        const updatedBooks = [...books];
        updatedBooks[index] = updatedBook; 
        console.log('we are here');
        console.log(updatedBook);
        setBooks(updatedBooks); 
    };

    const booksContent = books.map((item, index) => (
        <Book
            key={index}
            book={item}
            onSave={(updatedBook) => handleSave(index, updatedBook)}
            onReadCountChange={(newReadCount) => handleReadCountChange(index, newReadCount)}
        />
    ));

    return (
        <div className='container'>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={newBook.name}
                onChange={handleInputChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleInputChange}
            />
            {errors.author && <p className="error">{errors.author}</p>}
            <input
                type="text"
                name="genre"
                placeholder="Genre"
                value={newBook.genre}
                onChange={handleInputChange}
            />
            {errors.genre && <p className="error">{errors.genre}</p>}
            <input
                type="text"
                name="year"
                placeholder="Year"
                value={newBook.year}
                onChange={handleInputChange}
            />
            {errors.year && <p className="error">{errors.year}</p>}
            <input
                type="file"
                name="text"
                accept=".txt"
                onChange={handleFileChange}
            />
            {errors.text && <p className="error">{errors.text}</p>}
            <button className="book-button" onClick={addBook}>Add Book</button>

            <SearchBooks books={books} />
            {booksContent}
            <TopBooks books={sortedBooks} />
        </div>
    );
}

export default Books;
