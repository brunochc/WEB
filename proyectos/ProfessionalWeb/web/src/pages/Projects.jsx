import React from 'react';
import '../styles/Projects.css';

const Projects = () => {
    const projects = [
        {
            title: "Medical Information Platform",
            description: "A comprehensive MERN stack application that centralizes clinical histories, prescriptions, and exams. Designed to solve data fragmentation in healthcare, providing a unified dashboard for doctors and patients.",
            tech: ["MongoDB", "Express", "React", "Node.js"],
            links: { github: "https://github.com/Medula-Chile" }
        },
        {
            title: "Mining Data Optimization",
            description: "Data engineering solution for Codelco. Transformed dispersed heavy machinery data into structured insights, identifying failure patterns and optimizing maintenance cycles for a fleet of 100+ units.",
            tech: ["SQL", "Power Query", "Data Analysis", "KPIs"],
            links: {},
            confidential: true
        },
        {
            title: "Fleet Analysis Automation",
            description: "Automated reporting system for STP Santiago. Developed ETL pipelines and VBA scripts to process massive operational data, reducing reporting time by 30% and enabling predictive maintenance.",
            tech: ["Python", "VBA", "ETL", "Automation"],
            links: {},
            confidential: true
        },
        {
            title: "Professional Portfolio",
            description: "This modern, responsive website built to showcase my dual profile as an Engineer and Developer. Features a clean design, dark mode aesthetic, and component-based architecture.",
            tech: ["React", "CSS3", "Vite", "Responsive"],
            links: { github: "https://github.com/brunochc/WEB/tree/main/proyectos/ProfessionalWeb/web" }
        }
    ];

    return (
        <div className="projects-container">
            <header className="projects-header">
                <h1>Featured <span className="highlight">Projects</span></h1>
                <p className="subtitle">A selection of things I've built and optimized.</p>
            </header>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div className="project-card" key={index}>
                        <div className="project-top">
                            <div className="folder-icon">
                                <i className="bi bi-folder"></i>
                            </div>
                            <div className="project-links">
                                {project.confidential ? (
                                    <div className="confidential-badge" title="Proprietary Enterprise Code">
                                        <i className="bi bi-shield-lock-fill"></i>
                                    </div>
                                ) : (
                                    <>
                                        {project.links.github && (
                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                                                <i className="bi bi-github"></i>
                                            </a>
                                        )}
                                        {project.links.external && (
                                            <a href={project.links.external} target="_blank" rel="noopener noreferrer" aria-label="External Link">
                                                <i className="bi bi-box-arrow-up-right"></i>
                                            </a>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <h3 className="project-title">
                            {project.title}
                        </h3>
                        <p className="project-description">{project.description}</p>
                        <ul className="project-tech-list">
                            {project.tech.map((tech, i) => (
                                <li key={i}>{tech}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
