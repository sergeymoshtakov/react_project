import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navigation.css';

function Navigation() {
  return (
    <div className='container'>
        <nav className="navigation">
            <ul className="navigation-list">
                <li className="navigation-item">
                    <Link to="/" className="navigation-link">Home</Link>
                </li>
                <li className="navigation-item">
                    <Link to="/Books" className="navigation-link">Books</Link>
                </li>
            </ul>
        </nav>
    </div>
  );
}

export default Navigation;