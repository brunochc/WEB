import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = 'bruno.henriquez.1993@gmail.com';

    const handleCopyEmail = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    return (
        <div className="contact-container">
            <header className="contact-header">
                <h1>Get In <span className="highlight">Touch</span></h1>
                <p className="subtitle">Let's build something great together.</p>
            </header>

            <section className="contact-content">
                <p className="contact-intro">
                    I'm always open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="contact-cards">
                    <div className="contact-card email-card">
                        <a href={`mailto:${email}`} className="email-link">
                            <div className="icon-wrapper">
                                <span className="icon">✉️</span>
                            </div>
                            <h3>Email Me</h3>
                            <p>{email}</p>
                        </a>
                        <button
                            className={`copy-button ${copied ? 'copied' : ''}`}
                            onClick={handleCopyEmail}
                            aria-label="Copy email to clipboard"
                        >
                            {copied ? (
                                <>
                                    <span className="copy-icon">✓</span>
                                    <span className="copy-text">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <span className="copy-icon">📋</span>
                                    <span className="copy-text">Copy</span>
                                </>
                            )}
                        </button>
                    </div>

                    <a href="https://linkedin.com/in/bruno-henriquezcano" target="_blank" rel="noopener noreferrer" className="contact-card linkedin-card">
                        <div className="icon-wrapper">
                            <span className="icon">💼</span>
                        </div>
                        <h3>LinkedIn</h3>
                        <p>Connect with me professionally</p>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Contact;