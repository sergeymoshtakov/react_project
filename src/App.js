import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/books/Books';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="container">
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" exact element={ <Home/> } />
          <Route path="/Books" exact element={ <Books/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
