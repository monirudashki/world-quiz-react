import styles from "../GameFlags/GameFlags.module.css";

import { useContext, useRef, useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Timer } from "../../shared/TImes/Times";
import CoinsLives from "../../shared/CoinsLives/Coins&Lives";
import Jokers from "../Jokers/Jokers";
import { PublicJoker } from "../Jokers/PublicJoker";
import { CallFriend } from "../Jokers/CallFriend";
import { FlagsAnswers } from "./FlagsAnswers/FlagsAnswers";
import { AuthContext } from "../../../Contexts/AuthContext";
import { updateUser } from "../../../Services/capitalsService";
import { GameCapitalsContext } from "../../../Contexts/GameCapitalsContext";
import { userLevel } from "../GameCapitals/Utils/userLevel";
import { coinsForGame } from "../GameCapitals/Utils/coinsForGame";

export const GameFlags = () => {

    const { currentUser, currentUserLoginHandler } = useContext(AuthContext);
    const { setGameEarnCoinsHandler } = useContext(GameCapitalsContext);

    const navigateTo = useNavigate();

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3030/api/flags/gameQuestions`)
            .then(res => res.json())
            .then(result => {
                setQuestions(result);
            })
            .catch(err => console.log(err));
    }, []);

    const [gameFinish, setGameFinish] = useState(false);
    const setGameFinishHandler = () => {
        setGameFinish(true);
    }

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const addCorrectAnswer = () => {
        setCorrectAnswers(value => value + 1);
    };

    const lives = useRef(Number(currentUser.lives) - 1);

    const [questionNumber, setQuestionsNumber] = useState(1);
    const nextQuestion = () => {
        setQuestionsNumber(value => value + 1);
    };

    const [showFiftyFifty, setShowFiftyFifty] = useState(false);
    const showFiftyFiftyHandler = useCallback((boolean) => {
        setShowFiftyFifty(boolean);
    }, []);

    const [showCallFriendJoker, setShowCallFriendJoker] = useState(false);
    const showCallFriendJokerHandler = useCallback((boolean) => {
        setShowCallFriendJoker(boolean);
    }, []);

    const [showPublicJoker, setShowPublicJoker] = useState(false);
    const showPublicJokerHandler = useCallback((boolean) => {
        setShowPublicJoker(boolean);
    }, []);

    const location = useLocation();

    useEffect(() => {
        if (currentUser.lives < 1) {
            return navigateTo('/');
        }

        if (gameFinish) {
            const earnCoins = coinsForGame(correctAnswers);
            const lastFive = currentUser.lastFiveGames.slice(0, 4);
            lastFive.push(correctAnswers);
            const level = userLevel(currentUser.wrightAnswers + correctAnswers);
            const updateUserData = {
                lastFiveGames: lastFive,
                lives: lives.current,
                coins: earnCoins + Number(currentUser.coins),
                correctAnswers: correctAnswers + Number(currentUser.wrightAnswers),
                level: level
            }

            updateUser(updateUserData)
                .then(res => res.json())
                .then(result => currentUserLoginHandler(result));

            setGameEarnCoinsHandler(earnCoins);
            navigateTo('/result', {
                state: {
                    previousPath: location.pathname
                }
            });
        }
    }, [gameFinish,
        currentUserLoginHandler,
        correctAnswers,
        currentUser,
        navigateTo,
        setGameEarnCoinsHandler,
        location.pathname]);

    const onExitGame = () => {
        const lastFive = currentUser.lastFiveGames.slice(1, 5);
        lastFive.push(0);
        const updateUserData = {
            lastFiveGames: lastFive,
            lives: lives.current,
            coins: currentUser.coins,
            correctAnswers: currentUser.wrightAnswers,
            level: currentUser.level
        }

        updateUser(updateUserData)
            .then(res => res.json())
            .then(result => {
                currentUserLoginHandler(result);
            });

        navigateTo('/');
    }

    return (
        <>
            <div className={styles['header']}>
                <p className={styles['header__head']}>FLAGS QUIZ</p>

                <button type='button' className={styles['exit-button']} onClick={onExitGame}>EXIT</button>
            </div>

            {showCallFriendJoker && <CallFriend
                showCallFriendJokerHandler={showCallFriendJokerHandler}
                question={questions[questionNumber]}
            />}

            {showPublicJoker && <PublicJoker
                showPublicJokerHandler={showPublicJokerHandler}
                question={questions[questionNumber]} />}

            <Timer
                nextQuestion={nextQuestion}
                questionNumber={questionNumber}
                showFiftyFiftyHandler={showFiftyFiftyHandler}
                setGameFinishHandler={setGameFinishHandler}
                showCallFriendJokerHandler={showCallFriendJokerHandler}
                showPublicJokerHandler={showPublicJokerHandler}
            />

            <CoinsLives
                coins={currentUser.coins}
                lives={lives.current}
            ></CoinsLives>

            <section className={styles['question-container']}>
                <div className={styles['question']}>
                    <p>The Flag of {questions[questionNumber]?.title} is?</p>
                </div>

                <FlagsAnswers
                    questions={questions}
                    questionNumber={questionNumber}
                    addCorrectAnswer={addCorrectAnswer}
                    nextQuestion={nextQuestion}
                    showFiftyFifty={showFiftyFifty}
                    showFiftyFiftyHandler={showFiftyFiftyHandler}
                    setGameFinishHandler={setGameFinishHandler}
                />

                <Jokers
                    showFiftyFiftyHandler={showFiftyFiftyHandler}
                    showCallFriendJokerHandler={showCallFriendJokerHandler}
                    showPublicJokerHandler={showPublicJokerHandler}
                />
            </section>
            <div className={styles['number-container']}>
                <p className={styles['question-number']}>QUESTION - <span>{questionNumber}</span></p>
            </div>
        </>
    );
}