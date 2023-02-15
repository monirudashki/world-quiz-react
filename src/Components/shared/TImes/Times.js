import { useEffect, useState } from "react";
import styles from "../TImes/Times.module.css";

export const Timer = ({
    nextQuestion,
    questionNumber,
    showFiftyFiftyHandler
}) => {

    const [timer, setTimer] = useState(10);

    useEffect(() => {
        console.log('set timer')
        setTimer(20);
    }, [questionNumber])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                nextQuestion();
                showFiftyFiftyHandler(false);
            }
        }, 1000);


        return () => {
            clearInterval(intervalId);
        }
    }, [nextQuestion, timer]);

    let style;

    if (timer < 11) {
        style = { backgroundColor: 'red', color: 'whitesmoke' }
    }

    return (
        <div className={styles['timer']} style={style}>
            <p>{timer}</p>
        </div>
    );
}