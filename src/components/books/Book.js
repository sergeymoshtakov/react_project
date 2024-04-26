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

    const [state, setState] = useState([
        { key: 'bookData', value: initialBookState },
        { key: 'isReading', value: false },
        { key: 'isEditing', value: false },
        { key: 'errors', value: { name: '', author: '', genre: '', year: '', rating: '', review: '' } },
        { key: 'readCount', value: 0 }
    ]);

    const updateState = (key, newValue) => {
        setState(prevState =>
            prevState.map(item =>
                item.key === key ? { ...item, value: newValue } : item
            )
        );
    };

    const handleInputChange = (fieldName, value) => {
        updateState('bookData', { ...state.find(item => item.key === 'bookData').value, [fieldName]: value });
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
        updateState('errors', { ...state.find(item => item.key === 'errors').value, [fieldName]: errorMessage });
    };

    const validateForm = () => {
        let isValid = true;
        const fieldsToValidate = ['name', 'author', 'genre', 'year', 'rating', 'review'];
        const newErrors = {};

        fieldsToValidate.forEach(fieldName => {
            const value = state.find(item => item.key === 'bookData').value[fieldName];
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

        updateState('errors', newErrors);
        return isValid;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            updateState('bookData', { ...state.find(item => item.key === 'bookData').value, text: reader.result });
        };
        reader.readAsText(file);
    };

    const handleDownload = () => {
        const { name, text } = state.find(item => item.key === 'bookData').value;
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${name}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    const toggleReading = () => {
        updateState('isReading', !state.find(item => item.key === 'isReading').value);
        if (state.find(item => item.key === 'isReading').value) {
            updateState('readCount', state.find(item => item.key === 'readCount').value + 1);
            onReadCountChange(state.find(item => item.key === 'readCount').value + 1);
        }
    };

    const toggleEditing = () => {
        updateState('isEditing', !state.find(item => item.key === 'isEditing').value);
    };

    const handleSave = () => {
        const isValid = validateForm();
        if (isValid) {
            onSave(state.find(item => item.key === 'bookData').value);
            updateState('isEditing', false);
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
            {state.find(item => item.key === 'isEditing').value ? (
                <div>
                    {fields.map(field => (
                        <div key={field.name}>
                            <p><strong>{field.label}:</strong></p>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={state.find(item => item.key === 'bookData').value[field.name]}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={state.find(item => item.key === 'bookData').value[field.name]}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                />
                            )}
                            {state.find(item => item.key === 'errors').value[field.name] && <p className="error">{state.find(item => item.key === 'errors').value[field.name]}</p>}
                        </div>
                    ))}
                    <input type="file" onChange={handleFileChange} />
                    <button className="book-button" onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    {fields.map(field => (
                        <p className='book-info' key={field.name}>
                            <strong>{field.label}:</strong> {state.find(item => item.key === 'bookData').value[field.name]}
                        </p>
                    ))}
                    <p className='book-info'><strong>Read Count:</strong> {state.find(item => item.key === 'readCount').value}</p>
                    {!state.find(item => item.key === 'isReading').value ? (
                        <button className="book-button" onClick={toggleReading}>Read Book</button>
                    ) : (
                        <div>
                            <button className="book-button" onClick={toggleReading}>Close Book</button>
                            <div>{state.find(item => item.key === 'bookData').value.text}</div>
                        </div>
                    )}
                    <br />
                    <button className="book-button" onClick={handleDownload}>Download Text</button>
                </div>
            )}
            <button className="book-button edit-button" onClick={toggleEditing}>
                {state.find(item => item.key === 'isEditing').value ? "Cancel Edit" : "Edit Book"}
            </button>
        </div>
    );    
}

export default Book;
