import styles from '../GameCapitals/GameCapitals.module.css';

import { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../Contexts/AuthContext';

import { Timer } from '../../shared/TImes/Times';
import CoinsLives from '../../shared/CoinsLives/Coins&Lives';
import Jokers from '../Jokers/Jokers';
import { CapitalsAnswers } from './CapitalsAnswers.js/CapitalsAnswers';
import { CallFriend } from '../Jokers/CallFriend';
import { PublicJoker } from '../Jokers/PublicJoker';
import { coinsForGame } from './Utils/coinsForGame';

import { getCapitalsGameQuestions, updateUser } from '../../../Services/capitalsService';
import { userLevel } from './Utils/userLevel';
import { gameCurrentQuestion, gameEarnCoins, gameQuestions, gameResetState } from '../../../+store/features/game';
import { useGameCapitalsDispatch, useGameCapitalsSelector } from '../../../+store/redux-hooks/redux-hooks';

export const GameCapitals = () => {

    const { currentUser, currentUserLoginHandler } = useContext(AuthContext);

    const dispatch = useGameCapitalsDispatch();
    const gameState = useGameCapitalsSelector((state) => state.game);

    const navigateTo = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getCapitalsGameQuestions()
            .then(result => {
                dispatch(gameQuestions(result));
                dispatch(gameCurrentQuestion(result[0]));
            })
            .catch(err => console.log(err));
    }, [dispatch]);

    const lives = useRef(Number(currentUser.lives) - 1);

    useEffect(() => {
        if (currentUser.lives < 1) {
            return navigateTo('/');
        }

        if (gameState.gameFinish === true) {
            const earnCoins = coinsForGame(gameState.correctAnswers);
            const lastFive = currentUser.lastFiveGames.slice(0, 4);
            lastFive.push(gameState.correctAnswers);
            const level = userLevel(currentUser.wrightAnswers + gameState.correctAnswers);
            const updateUserData = {
                lastFiveGames: lastFive,
                lives: lives.current,
                coins: earnCoins + Number(currentUser.coins),
                correctAnswers: gameState.correctAnswers + Number(currentUser.wrightAnswers),
                level: level
            }

            updateUser(updateUserData)
                .then(res => res.json())
                .then(result => currentUserLoginHandler(result));

            dispatch(gameEarnCoins(earnCoins));

            navigateTo('/result', {
                state: {
                    previousPath: location.pathname
                }
            });
        }
    }, [gameState.gameFinish,
    gameState.correctAnswers,
        currentUser,
        navigateTo,
        dispatch,
        currentUserLoginHandler,
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

        dispatch(gameResetState());

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
                <p className={styles['header__head']}>CAPITALS QUIZ</p>
                <button type='button' className={styles['exit-button']} onClick={onExitGame}>EXIT</button>
            </div>

            {gameState.showCallFriendJoker === true && <CallFriend gameState={gameState} game='Capitals' />}

            {gameState.showPublicJoker === true && <PublicJoker gameState={gameState} game='Capitals' />}

            <Timer gameState={gameState} />

            <CoinsLives coins={currentUser.coins} lives={lives.current} />

            <section className={styles['question-container']}>
                <div className={styles['question']}>
                    <p>The Capital of {gameState.currentQuestion?.title} is?</p>
                </div>

                <CapitalsAnswers gameState={gameState} />

                <Jokers gameState={gameState} />

            </section>
            <div className={styles['number-container']}>
                <p className={styles['question-number']}>QUESTION - <span data-testid='question-number'>{gameState.questionNumber}</span></p>
            </div>
        </>
    );
}