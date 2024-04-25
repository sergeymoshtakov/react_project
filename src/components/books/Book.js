import React, { useState } from 'react';

function Book(props) {
    const { name: initialName, author: initialAuthor, genre: initialGenre, year: initialYear, text: initialText, rating: initialRating, review: initialReview } = props.book;
    const [isReading, setIsReading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);
    const [author, setAuthor] = useState(initialAuthor);
    const [genre, setGenre] = useState(initialGenre);
    const [year, setYear] = useState(initialYear);
    const [text, setText] = useState(initialText);
    const [rating, setRating] = useState(initialRating);
    const [review, setReview] = useState(initialReview);
    const [errors, setErrors] = useState({
        name: '',
        author: '',
        genre: '',
        year: '',
        rating: '',
        review: ''
    });
    const [readCount, setReadCount] = useState(0);

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${name}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    const toggleReading = () => {
        setIsReading(!isReading);
        if(isReading){
            setReadCount(readCount + 1); 
            props.onReadCountChange(readCount);
        }
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        const isValid = validateForm();
        if (isValid) {
            props.onSave({name, author, genre, year, text, rating, review});
            setIsEditing(false);
        }
    };

    const handleInputChange = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setName(value);
                validateField('name', value);
                break;
            case 'author':
                setAuthor(value);
                validateField('author', value);
                break;
            case 'genre':
                setGenre(value);
                validateField('genre', value);
                break;
            case 'year':
                setYear(value);
                validateField('year', value);
                break;
            case 'text':
                setText(value);
                break;
            case 'rating':
                setRating(value);
                validateField('rating', value);
                break;
            case 'review':
                setReview(value);
                validateField('review', value);
                break;
            default:
                break;
        }
    };

    const validateField = (fieldName, value) => {
        let errorMessage = '';
        switch (fieldName) {
            case 'name':
                if (!value || !value.trim()) {
                    errorMessage = 'Name cannot be empty.';
                }
                break;
            case 'author':
                if (!value || !value.trim()) {
                    errorMessage = 'Author cannot be empty.';
                }
                break;
            case 'genre':
                if (!value || !value.trim()) {
                    errorMessage = 'Genre cannot be empty.';
                }
                break;
            case 'year':
                const yearNumber = parseInt(value);
                if (isNaN(yearNumber) || yearNumber < 0 || yearNumber > 2024) {
                    errorMessage = 'Please enter a valid year between 0 and 2024.';
                }
                break;
            case 'rating':
                if (value && (value < 1 || value > 5)) {
                    errorMessage = 'Rating must be between 1 and 5.';
                }
                break;
            case 'review':
                if (value && value.trim().length > 200) {
                    errorMessage = 'Review must be at most 200 characters long.';
                }
                break;
            default:
                break;
        }
        setErrors({ ...errors, [fieldName]: errorMessage });
    };

    const validateForm = () => {
        let isValid = true;
        const fieldsToValidate = ['name', 'author', 'genre', 'year', 'rating', 'review'];
        const newErrors = {};

        fieldsToValidate.forEach(fieldName => {
            switch (fieldName) {
                case 'name':
                    if (!name || !name.trim()) {
                        newErrors.name = 'Name cannot be empty.';
                        isValid = false;
                    }
                    break;
                case 'author':
                    if (!author || !author.trim()) {
                        newErrors.author = 'Author cannot be empty.';
                        isValid = false;
                    }
                    break;
                case 'genre':
                    if (!genre || !genre.trim()) {
                        newErrors.genre = 'Genre cannot be empty.';
                        isValid = false;
                    }
                    break;
                case 'year':
                    const yearNumber = parseInt(year);
                    if (isNaN(yearNumber) || yearNumber < 0 || yearNumber > 2024) {
                        newErrors.year = 'Please enter a valid year between 0 and 2024.';
                        isValid = false;
                    }
                    break;
                case 'rating':
                    if (rating && (rating < 1 || rating > 5)) {
                        newErrors.rating = 'Rating must be between 1 and 5.';
                        isValid = false;
                    }
                    break;
                case 'review':
                    if (review && review.trim().length > 200) {
                        newErrors.review = 'Review must be at most 200 characters long.';
                        isValid = false;
                    }
                    break;
                default:
                    break;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className='book-container'>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                    />
                    {errors.author && <p className="error">{errors.author}</p>}
                    <input
                        type="text"
                        name="genre"
                        value={genre}
                        onChange={(e) => handleInputChange('genre', e.target.value)}
                    />
                    {errors.genre && <p className="error">{errors.genre}</p>}
                    <input
                        type="text"
                        name="year"
                        value={year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                    />
                    {errors.year && <p className="error">{errors.year}</p>}
                    <textarea
                        name="text"
                        value={text}
                        onChange={(e) => handleInputChange('text', e.target.value)}
                    />
                    <input
                        type="number"
                        name="rating"
                        value={rating}
                        onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
                    />
                    {errors.rating && <p className="error">{errors.rating}</p>}
                    <textarea
                        name="review"
                        value={review}
                        onChange={(e) => handleInputChange('review', e.target.value)}
                    />
                    {errors.review && <p className="error">{errors.review}</p>}
                    <button className="book-button" onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <h3 className='book-title'>{name}</h3>
                    <p className='book-info'><strong>Author:</strong> {author}</p>
                    <p className='book-info'><strong>Genre:</strong> {genre}</p>
                    <p className='book-info'><strong>Year:</strong> {year}</p>
                    <p className='book-info'><strong>Rating:</strong> {rating}</p>
                    <p className='book-info'><strong>Review:</strong> {review}</p>
                    <p className='book-info'><strong>Read Count:</strong> {readCount}</p> {/* Отображаем количество прочтений */}
                    {!isReading ? (
                        <button className="book-button" onClick={toggleReading}>Read Book</button>
                    ) : (
                        <div>
                            <button className="book-button" onClick={toggleReading}>Close Book</button>
                            <div>{text}</div>
                        </div>
                    )}
                    <br />
                    <button className="book-button" onClick={handleDownload}>Download Text</button>
                </div>
            )}
            <button className="book-button edit-button" onClick={toggleEditing}>
                {isEditing ? "Cancel Edit" : "Edit Book"}
            </button>
        </div>
    );
}

export default Book;