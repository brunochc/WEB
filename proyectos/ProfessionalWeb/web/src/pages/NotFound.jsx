import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-icon">🛸</div>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>
                    Looks like you've ventured into uncharted territory.
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="home-link">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
