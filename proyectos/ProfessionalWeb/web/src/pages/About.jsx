import React from 'react';
import '../styles/About.css';
import ResumeDownload from '../components/ResumeDownload';

const About = () => {
    return (
        <div className="about-container">
            <header className="about-header">
                <h1>Beyond Code: <span className="highlight">Applied Engineering</span></h1>
                <p className="subtitle">Where theory meets practice.</p>
            </header>

            <section className="about-section introduction">
                <h2>Introduction</h2>
                <p>
                    I am an <strong>Engineer in Machinery, Automotive Vehicles, and Electronic Systems</strong>, with a background in the common core of Computer Science Engineering.
                    My journey began long before writing my first line of code: my passion for understanding the internal workings of things led me to train in the workshop and construction sites.
                    This solid technical foundation gives me unique versatility: I possess the ability to solve problems in any environment, integrating the physical world with the digital one.
                </p>
            </section>

            <section className="about-section philosophy">
                <h2>Philosophy: Systemic Analysis and Problem Solving</h2>
                <p>
                    More than simple maintenance, my focus is based on the ability to solve a variable level of problems and generate a measurable impact on asset efficiency and availability.
                    Just as in machinery engineering, in software development, I analyze patterns and activity data to diagnose the root cause of failures.
                    I apply this analytical vision to optimize processes, ensure operational continuity, and build robust solutions.
                </p>
            </section>

            <section className="about-section skills">
                <h2>Life Skills (The "Hard" Skills)</h2>

                <div className="skill-card">
                    <h3>1. Automotive Mechanics & Diagnostics</h3>
                    <p className="skill-tag">Self-taught and Passionate</p>
                    <ul>
                        <li><strong>What I do:</strong> Comprehensive vehicle diagnosis and repair. From preventive maintenance to complex engine and transmission repairs.</li>
                        <li><strong>What it brings to my engineering:</strong> Systemic analysis capability. I understand systems as a set of interconnected components where the failure of a small part can stop the entire operation.</li>
                    </ul>
                </div>

                <div className="skill-card">
                    <h3>2. Construction & Trades: High Standards</h3>
                    <p className="skill-tag">The value of excellence and detail</p>
                    <ul>
                        <li><strong>Experience:</strong> My training in this field comes from working alongside a family member who is an expert in high-level construction for the exclusive sector. In this environment, the demand for neatness and perfection was absolute.</li>
                        <li><strong>What it brings to my engineering:</strong>
                            <ul>
                                <li><strong>Precision and Planning:</strong> I learned to work with order, cleanliness, exact measurements, and rigorous interpretation of blueprints.</li>
                                <li><strong>Discipline:</strong> I bring that same culture of excellence to my software architecture and code quality.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="about-section industrial">
                <h2>Industrial Experience (The Bridge Between Two Worlds)</h2>
                <div className="experience-card">
                    <h3>Mining Optimization (Codelco)</h3>
                    <p>
                        In my formal experience in large-scale mining, I managed massive volumes of technical information in a high-pressure environment. Although the role might have seemed administrative, the reality of the work required constant data engineering:
                    </p>
                    <ul>
                        <li><strong>Complexity:</strong> I transformed dispersed and complex heavy machinery data into structured information for decision-making.</li>
                        <li><strong>Optimization:</strong> I identified patterns in failures and repair times that allowed for the optimization of maintenance cycles.</li>
                    </ul>
                    <p className="conclusion-text">
                        This background gives me the confidence to contribute in any way necessary. Whether tackling complex technical challenges or supporting critical operational tasks, I am fully capable and willing to add value wherever the team needs it most.
                    </p>
                </div>
            </section>

            <ResumeDownload />
        </div>
    );
};

export default About;
