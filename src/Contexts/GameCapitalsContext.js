import { createContext, useEffect, useState } from "react";

export const GameCapitalsContext = createContext();

export const GameCapitalsProvider = ({
    children,
}) => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3030/api/capitals/gameQuestions`)
            .then(res => res.json())
            .then(result => {
                setQuestions(result);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <GameCapitalsContext.Provider value={{ questions }}>
            {children}
        </GameCapitalsContext.Provider>
    )
}
