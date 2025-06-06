import React from "react";

export const useWords = (initialValue = []) => {
    const [characters, setCharacters] = React.useState(initialValue);

    const push = (chars) => {
        setCharacters((prevChars) => [...prevChars, ...chars]);
    }

    const clear = () => {
        setCharacters([]);
    }

    const heads = () => {
        if (characters.length === 0) {
            return [];
        }
        return characters.slice(0, 5);
    }

    return {characters, push, clear, heads};
}