import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
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
                    <a href="mailto:bruno.henriquez.1993@gmail.com" className="contact-card email-card">
                        <div className="icon-wrapper">
                            <span className="icon">✉️</span>
                        </div>
                        <h3>Email Me</h3>
                        <p>bruno.henriquez.1993@gmail.com</p>
                    </a>

                    <div className="contact-card phone-card">
                        <div className="icon-wrapper">
                            <span className="icon">📱</span>
                        </div>
                        <h3>Call Me</h3>
                        <p>+1 (Coming Soon)</p>
                        <span className="note">Canadian number pending arrival</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;