import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Transforming <span className="highlight">Operational Chaos</span> into <span className="highlight">Structured Efficiency</span>
                    </h1>
                    <p className="hero-subtitle">
                        Full-Stack Development & Industrial Optimization.
                        <br />
                        Bridging the gap between physical systems and digital solutions.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/projects" className="btn btn-primary">View Projects</Link>
                        <Link to="/about" className="btn btn-secondary">My Philosophy</Link>
                    </div>
                </div>
                <div className="hero-visual">
                    {/* Placeholder for the visual concept - maybe a CSS shape or image later */}
                    <div className="visual-circle"></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
