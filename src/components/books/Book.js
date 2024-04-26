import React, { useState } from 'react';

function Book({ book, onSave, onReadCountChange }) {
    const initialBookState = {
        name: book.name,
        author: book.author,
        genre: book.genre,
        year: book.year,
        text: book.text,
        rating: book.rating,
        review: book.review
    };

    const [bookData, setBookData] = useState(initialBookState);
    const [isReading, setIsReading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        author: '',
        genre: '',
        year: '',
        rating: '',
        review: ''
    });
    const [readCount, setReadCount] = useState(0);

    const handleInputChange = (fieldName, value) => {
        setBookData({ ...bookData, [fieldName]: value });
        validateField(fieldName, value);
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
            const value = bookData[fieldName];
            switch (fieldName) {
                case 'name':
                case 'author':
                case 'genre':
                    if (!value || !value.trim()) {
                        newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} cannot be empty.`;
                        isValid = false;
                    }
                    break;
                case 'year':
                    const yearNumber = parseInt(value);
                    if (isNaN(yearNumber) || yearNumber < 0 || yearNumber > 2024) {
                        newErrors[fieldName] = 'Please enter a valid year between 0 and 2024.';
                        isValid = false;
                    }
                    break;
                case 'rating':
                    if (value && (value < 1 || value > 5)) {
                        newErrors[fieldName] = 'Rating must be between 1 and 5.';
                        isValid = false;
                    }
                    break;
                case 'review':
                    if (value && value.trim().length > 200) {
                        newErrors[fieldName] = 'Review must be at most 200 characters long.';
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setBookData({ ...bookData, text: reader.result });
        };
        reader.readAsText(file);
    };

    const handleDownload = () => {
        const { name, text } = bookData;
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${name}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    const toggleReading = () => {
        setIsReading(!isReading);
        if (isReading) {
            setReadCount(readCount + 1);
            onReadCountChange(readCount + 1);
        }
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        const isValid = validateForm();
        if (isValid) {
            onSave(bookData);
            setIsEditing(false);
        }
    };

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'author', label: 'Author', type: 'text' },
        { name: 'genre', label: 'Genre', type: 'text' },
        { name: 'year', label: 'Year', type: 'text' },
        { name: 'rating', label: 'Rating', type: 'number' },
        { name: 'review', label: 'Review', type: 'textarea' },
    ];

    return (
        <div className='book-container'>
            {isEditing ? (
                <div>
                    {fields.map(field => (
                        <div key={field.name}>
                            <p><strong>{field.label}:</strong></p>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={bookData[field.name]}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={bookData[field.name]}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                />
                            )}
                            {errors[field.name] && <p className="error">{errors[field.name]}</p>}
                        </div>
                    ))}
                    <input type="file" onChange={handleFileChange} />
                    <button className="book-button" onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    {fields.map(field => (
                        <p className='book-info' key={field.name}>
                            <strong>{field.label}:</strong> {bookData[field.name]}
                        </p>
                    ))}
                    <p className='book-info'><strong>Read Count:</strong> {readCount}</p>
                    {!isReading ? (
                        <button className="book-button" onClick={toggleReading}>Read Book</button>
                    ) : (
                        <div>
                            <button className="book-button" onClick={toggleReading}>Close Book</button>
                            <div>{bookData.text}</div>
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