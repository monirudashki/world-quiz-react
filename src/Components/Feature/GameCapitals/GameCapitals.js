import styles from '../GameCapitals/GameCapitals.module.css';

import { useNavigate } from 'react-router-dom';
// import { Spinner } from '../../shared/Spinner.js/Spinner';
import { Timer } from '../../shared/TImes/Times';
import CoinsLives from '../../shared/CoinsLives/Coins&Lives';
import { Jokers } from '../Jokers/Jokers';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import { GameCapitalsContext } from '../../../Contexts/GameCapitalsContext';
import { CapitalsAnswers } from './CapitalsAnswers.js/CapitalsAnswers';
import { CallFriend } from '../Jokers/CallFriend';
import { PublicJoker } from '../Jokers/PublicJoker';
import { coinsForGame } from './Utils/coinsForGame';

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

    const lives = Number(currentUser.lives) - 1; //Use ref or something like this to asign value just ones

    const [questionNumber, setQuestionsNumber] = useState(0);
    const nextQuestion = () => {
        setQuestionsNumber(value => value + 1);
    };

    const [showFiftyFifty, setShowFiftyFifty] = useState(false);
    const showFiftyFiftyHandler = (boolean) => {
        setShowFiftyFifty(boolean);
    }

    const [showCallFriendJoker, setShowCallFriendJoker] = useState(false);
    const showCallFriendJokerHandler = (boolean) => {
        setShowCallFriendJoker(boolean);
    }

    const [showPublicJoker, setShowPublicJoker] = useState(false);
    const showPublicJokerHandler = (boolean) => {
        setShowPublicJoker(boolean);
    }

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
                lives: lives,
                coins: earnCoins + Number(currentUser.coins),
                correctAnswers: correctAnswers + Number(currentUser.wrightAnswers),
            }

            fetch(`http://localhost:3030/api/users/profile/update`, {
                method: "PUT",
                headers: { 'Content-type': 'Application/json' },
                credentials: 'include',
                body: JSON.stringify(updateUserData)
            })
                .then(res => res.json())
                .then(result => currentUserLoginHandler(result));

            setNewGameHandler(true);
            setGameEarnCoinsHandler(earnCoins);
            navigateTo('/result')
        }
    }, [gameFinish, correctAnswers, currentUser, lives, navigateTo, setGameEarnCoinsHandler, currentUserLoginHandler, setNewGameHandler]);

    const onExitGame = () => {
        const lastFive = currentUser.lastFiveGames.slice(1, 5);
        lastFive.push(0);
        const updateUserData = {
            lastFiveGames: lastFive,
            lives: lives,
            coins: currentUser.coins,
            correctAnswers: currentUser.wrightAnswers,
        }

        fetch(`http://localhost:3030/api/users/profile/update`, {
            method: "PUT",
            headers: { 'Content-type': 'Application/json' },
            credentials: 'include',
            body: JSON.stringify(updateUserData)
        })
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
                <p className={styles['question-number']}>QUESTION - <span>{Number(questionNumber) + 1}</span></p>
            </div>
        </>
    );
}