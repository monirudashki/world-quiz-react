import styles from "../GameFlags/GameFlags.module.css";

import { useContext, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Timer } from "../../shared/TImes/Times";
import CoinsLives from "../../shared/CoinsLives/Coins&Lives";
import Jokers from "../Jokers/Jokers";
import { PublicJoker } from "../Jokers/PublicJoker";
import { CallFriend } from "../Jokers/CallFriend";
import { FlagsAnswers } from "./FlagsAnswers/FlagsAnswers";
import { AuthContext } from "../../../Contexts/AuthContext";
import { updateUser } from "../../../Services/capitalsService";
import { userLevel } from "../GameCapitals/Utils/userLevel";
import { coinsForGame } from "../GameCapitals/Utils/coinsForGame";
import { useDispatch, useSelector } from "react-redux";
import { gameCurrentQuestion, gameEarnCoins, gameQuestions, gameResetState } from "../../../+store/features/game";

export const GameFlags = () => {

    const { currentUser, currentUserLoginHandler } = useContext(AuthContext);

    const location = useLocation();

    const dispatch = useDispatch();
    const gameState = useSelector((state) => state.game);

    const navigateTo = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3030/api/flags/gameQuestions`)
            .then(res => res.json())
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
        currentUserLoginHandler,
        currentUser,
    location.pathname,
        navigateTo,
        dispatch]);

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
                <p className={styles['header__head']}>FLAGS QUIZ</p>

                <button type='button' className={styles['exit-button']} onClick={onExitGame}>EXIT</button>
            </div>

            {gameState.showCallFriendJoker === true && <CallFriend gameState={gameState} />}

            {gameState.showPublicJoker === true && <PublicJoker gameState={gameState} />}

            <Timer gameState={gameState} />

            <CoinsLives coins={currentUser.coins} lives={lives.current} />

            <section className={styles['question-container']}>
                <div className={styles['question']}>
                    <p>The Flag of {gameState.currentQuestion?.title} is?</p>
                </div>

                <FlagsAnswers gameState={gameState} />

                <Jokers gameState={gameState} />

            </section>
            <div className={styles['number-container']}>
                <p className={styles['question-number']}>QUESTION - <span>{gameState.questionNumber}</span></p>
            </div>
        </>
    );
}