import { createContext, useCallback, useEffect, useState } from "react";

export const GameCapitalsContext = createContext();

export const GameCapitalsProvider = ({
    children,
}) => {

    const [newGame, setNewGame] = useState(false);
    const setNewGameHandler = useCallback((boolean) => {
        setNewGame(boolean);
    }, []);

    const [questions, setQuestions] = useState([]);

    const [gameEarnCoins, setGameEarnCoins] = useState(0);
    const setGameEarnCoinsHandler = useCallback((value) => {
        setGameEarnCoins(value);
    }, []);

    useEffect(() => {
        if (newGame || questions.length === 0) {
            setNewGame(false);
            fetch(`http://localhost:3030/api/capitals/gameQuestions`)
                .then(res => res.json())
                .then(result => {
                    setQuestions(result);
                })
                .catch(err => console.log(err));
        }
    }, [newGame, questions]);


    return (
        <GameCapitalsContext.Provider value={{ questions, gameEarnCoins, setGameEarnCoinsHandler, setNewGameHandler }}>
            {children}
        </GameCapitalsContext.Provider>
    )
}
