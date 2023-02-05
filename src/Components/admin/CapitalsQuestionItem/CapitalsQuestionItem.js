import styles from "../CapitalsQuestionItem/CapitalQuestionItem.module.css";

export const CapitalsQuestionItem = (question) => {
    return (
        <div className={styles["question-item"]}>
            <h2>Capitol {question.title}</h2>
            <p className={styles["question-answer"]}>{question.firstAnswer}</p>
            <p className={styles["question-answer"]}>{question.secondAnswer}</p>
            <p className={styles["question-answer"]}>{question.thirdAnswer}</p>
            <p className={styles["question-answer"]}>{question.fourthAnswer}</p>

            <div className={styles["right-answer-container"]}>
                <p>Wright answer: {question.wrightAnswer}</p>
            </div>

            <div className={styles['action-buttons']}>
                <button type="button" className={styles['action-button']}>Edit</button>
                <button type="button" className={styles['action-button']}>Delete</button>
            </div>
        </div>
    );
}