import React from 'react';
import { Link } from 'react-router-dom';
import LightPillar from '../components/LightPillar';
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
                    <LightPillar
                        topColor="#64ffda"
                        bottomColor="#0a192f"
                        intensity={0.4}
                        rotationSpeed={0.1}
                        glowAmount={0.003}
                        pillarWidth={20.0}
                        pillarHeight={1.0}
                        noiseIntensity={0.2}
                        pillarRotation={15}
                        interactive={true}
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;
