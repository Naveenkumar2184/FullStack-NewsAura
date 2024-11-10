import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context for Dark Mode
const DarkModeContext = createContext();

// Create a provider component
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if dark mode was saved in localStorage
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
    }, []);

    useEffect(() => {
        // Save the dark mode state in localStorage
        localStorage.setItem('darkMode', darkMode);
        document.body.classList.toggle('dark-mode', darkMode); // Add dark-mode class to body
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

// Custom hook to access dark mode state
export const useDarkMode = () => useContext(DarkModeContext);
