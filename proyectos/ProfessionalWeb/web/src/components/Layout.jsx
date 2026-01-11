import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Bruno Henríquez Cano. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Layout;
