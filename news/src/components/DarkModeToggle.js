import React from 'react';
import { useDarkMode } from '../DarkModeContext';

const DarkModeToggle = () => {
    const { darkMode, setDarkMode } = useDarkMode();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default DarkModeToggle;
