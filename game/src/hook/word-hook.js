import React from "react";

export const WordContext = React.createContext()

export function Words({ children }) {
    const [characters, setCharacters] = React.useState([]);

    const push = (chars) => {
        setCharacters((prevChars) => [...prevChars, ...chars]);
    }

    const clear = () => {
        let novo = []
        setCharacters(novo);
    }

    const heads = () => {
        if (characters.length === 0) {
            return [];
        }
        return characters.slice(characters.length - 5, characters.length);
    }

    return (
        <WordContext.Provider value={{
            push,
            clear,
            heads,
            characters
        }}>
            {children}
        </WordContext.Provider>
    )
}