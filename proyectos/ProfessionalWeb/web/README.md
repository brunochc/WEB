# Professional Portfolio - Frontend

## Overview
This directory contains the frontend application for the Professional Portfolio, built with **React 18** and **Vite**. It utilizes **Bootstrap 5** for responsive layout and custom CSS for the dark theme aesthetic.

## Tech Stack
- **Core:** React, ReactDOM
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Bootstrap 5, Bootstrap Icons, Custom CSS

## Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with HMR at `http://localhost:5173`. |
| `npm run build` | Builds the application for production to the `dist` folder. |
| `npm run lint` | Runs ESLint to check for code quality issues. |
| `npm run preview` | Locally previews the production build. |

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx       # Main layout wrapper (Navbar + Outlet + Footer)
│   └── Navbar.jsx       # Responsive navigation bar
├── pages/
│   ├── Home.jsx         # Landing page with hero section
│   ├── About.jsx        # Detailed profile and skills
│   ├── Projects.jsx     # Grid showcase of key projects
│   └── Contact.jsx      # Contact information and form placeholder
├── styles/
│   ├── About.css        # Styles for About page
│   ├── Contact.css      # Styles for Contact page
│   ├── Home.css         # Styles for Home page
│   ├── Navbar.css       # Styles for Navbar overrides
│   └── Projects.css     # Styles for Projects grid
├── App.jsx              # Route definitions
├── main.jsx             # Entry point (Bootstrap imports)
└── index.css            # Global styles and variables
```

## Key Dependencies
- `bootstrap`: ^5.3.0
- `bootstrap-icons`: ^1.11.0
- `react-router-dom`: ^6.20.0

## Development Notes
- **Styling:** We use standard CSS modules imported in components. Bootstrap classes are used for layout (grid, navbar), while custom CSS handles the specific color palette (`#0a192f`, `#64ffda`).
- **Assets:** Static assets (images, PDFs) should be placed in the `public` directory.
