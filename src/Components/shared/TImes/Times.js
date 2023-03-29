import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { gameCurrentQuestion, gameNextQuestion, gameShowCallFriendJokerToggle, gameShowFiftyFiftyToggle, gameShowPublicJokerToggle } from "../../../+store/features/game";
import styles from "../TImes/Times.module.css";

export const Timer = ({
    gameState
}) => {

    const [timer, setTimer] = useState(60);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimer(60);
    }, [gameState.questionNumber])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                dispatch(gameNextQuestion());
                dispatch(gameCurrentQuestion(gameState.questions[gameState.questionNumber]));
                dispatch(gameShowFiftyFiftyToggle(false));
                dispatch(gameShowPublicJokerToggle(false));
                dispatch(gameShowCallFriendJokerToggle(false));
            }
        }, 1000);


        return () => {
            clearInterval(intervalId);
        }
    }, [timer, dispatch, gameState.questions, gameState.questionNumber]);

    let style;

    if (timer < 11) {
        style = { backgroundColor: 'red', color: 'whitesmoke' }
    }

    return (
        <div data-testid='timer-wrapper' className={styles['timer']} style={style}>
            <p data-testid='timer'>{timer}</p>
        </div>
    );
}