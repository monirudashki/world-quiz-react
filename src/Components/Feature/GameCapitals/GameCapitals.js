import styles from '../GameCapitals/GameCapitals.module.css';

import { useLocation, useNavigate } from 'react-router-dom';
// import { Spinner } from '../../shared/Spinner.js/Spinner';
import { Timer } from '../../shared/TImes/Times';
import CoinsLives from '../../shared/CoinsLives/Coins&Lives';
import Jokers from '../Jokers/Jokers';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import { GameCapitalsContext } from '../../../Contexts/GameCapitalsContext';
import { CapitalsAnswers } from './CapitalsAnswers.js/CapitalsAnswers';
import { CallFriend } from '../Jokers/CallFriend';
import { PublicJoker } from '../Jokers/PublicJoker';
import { coinsForGame } from './Utils/coinsForGame';
import { updateUser } from '../../../Services/capitalsService';

export const GameCapitals = () => {

    const { questions, setGameEarnCoinsHandler, setNewGameHandler } = useContext(GameCapitalsContext);
    const { currentUser, currentUserLoginHandler } = useContext(AuthContext);

    const navigateTo = useNavigate();

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
            const updateUserData = {
                lastFiveGames: lastFive,
                lives: lives.current,
                coins: earnCoins + Number(currentUser.coins),
                correctAnswers: correctAnswers + Number(currentUser.wrightAnswers),
            }

            updateUser(updateUserData)
                .then(res => res.json())
                .then(result => currentUserLoginHandler(result));

            setNewGameHandler(true);
            setGameEarnCoinsHandler(earnCoins);
            navigateTo('/result', {
                state: {
                    previousPath: location.pathname
                }
            });
        }
    }, [gameFinish,
        correctAnswers,
        currentUser,
        navigateTo,
        setGameEarnCoinsHandler,
        currentUserLoginHandler,
        setNewGameHandler,
        location.pathname]);

    const onExitGame = () => {
        const lastFive = currentUser.lastFiveGames.slice(1, 5);
        lastFive.push(0);
        const updateUserData = {
            lastFiveGames: lastFive,
            lives: lives.current,
            coins: currentUser.coins,
            correctAnswers: currentUser.wrightAnswers,
        }

        updateUser(updateUserData)
            .then(res => res.json())
            .then(result => {
                currentUserLoginHandler(result);
                setNewGameHandler(true);
            });

        navigateTo('/');
    }

    return (
        <>
            <div className={styles['header']}>
                <p className={styles['header__head']}>CAPITALS QUIZ</p>
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
                lives={lives}
            ></CoinsLives>

            <section className={styles['question-container']}>
                <div className={styles['question']}>
                    <p>The Capital of {questions[questionNumber]?.title} is?</p>
                </div>

                <CapitalsAnswers
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