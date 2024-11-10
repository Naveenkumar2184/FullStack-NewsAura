import React, { useEffect } from 'react';

const GoogleTranslate = () => {
    useEffect(() => {
        // Dynamically load the Google Translate script
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <h2>Google Translate Widget</h2>
            <div id="google_translate_element"></div>
        </div>
    );
};

export default GoogleTranslate;
