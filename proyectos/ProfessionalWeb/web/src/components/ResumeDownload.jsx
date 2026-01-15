import React from 'react';
import '../styles/ResumeDownload.css';

const ResumeDownload = () => {
    return (
        <section className="resume-download-section">
            <h2>Download My Resume</h2>
            <p className="section-subtitle">Choose the version that best fits your needs</p>

            <div className="resume-cards">
                <div className="resume-card">
                    <div className="card-icon">
                        <i className="bi bi-briefcase-fill"></i>
                    </div>
                    <h3>Hybrid Profile</h3>
                    <p className="card-description">
                        Technical + Hands-On Experience
                    </p>
                    <ul className="card-features">
                        <li><i className="bi bi-check-circle-fill"></i> Industrial systems expertise</li>
                        <li><i className="bi bi-check-circle-fill"></i> Full-stack development</li>
                        <li><i className="bi bi-check-circle-fill"></i> Automotive diagnostics</li>
                    </ul>
                    <a href="/Resume_BrunoH_HY.pdf" download="Resume_BrunoH_HY.pdf" className="download-btn">
                        <i className="bi bi-download"></i> Download PDF
                    </a>
                </div>

                <div className="resume-card">
                    <div className="card-icon tech">
                        <i className="bi bi-code-slash"></i>
                    </div>
                    <h3>Tech Focus</h3>
                    <p className="card-description">
                        Software & Data Engineering
                    </p>
                    <ul className="card-features">
                        <li><i className="bi bi-check-circle-fill"></i> MERN stack development</li>
                        <li><i className="bi bi-check-circle-fill"></i> Data pipelines & ETL</li>
                        <li><i className="bi bi-check-circle-fill"></i> Oracle & SQL databases</li>
                    </ul>
                    <a href="/Resume_BrunoH_IT.pdf" download="Resume_BrunoH_IT.pdf" className="download-btn">
                        <i className="bi bi-download"></i> Download PDF
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ResumeDownload;
