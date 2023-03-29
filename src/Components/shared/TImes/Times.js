import { useEffect, useState } from "react";
import styles from "../TImes/Times.module.css";

export const Timer = ({
    nextQuestion,
    questionNumber,
    showFiftyFiftyHandler,
    showCallFriendJokerHandler,
    showPublicJokerHandler
}) => {

    const [timer, setTimer] = useState(60);

    useEffect(() => {
        setTimer(60);
    }, [questionNumber])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                nextQuestion();
                showFiftyFiftyHandler(false);
                showPublicJokerHandler(false);
                showCallFriendJokerHandler(false);
            }
        }, 1000);


        return () => {
            clearInterval(intervalId);
        }
    }, [nextQuestion, timer, showCallFriendJokerHandler, showFiftyFiftyHandler, showPublicJokerHandler]);

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