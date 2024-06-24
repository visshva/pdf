import React, { createContext, useState, useContext } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(14);

    const increaseFontSize = () => setFontSize((prev) => prev + 1);
    const decreaseFontSize = () => setFontSize((prev) => (prev > 10 ? prev - 1 : prev));

    return (
        <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => useContext(FontSizeContext);
