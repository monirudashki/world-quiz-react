import styles from "../CapitalsQuestionItem/CapitalQuestionItem.module.css";

export const CapitalsQuestionItem = (question) => {
    return (
        <div className={styles["question-item"]}>
            <h2>Capitol {question.title}</h2>
            <p className={styles["question-answer"]}>{question.answerA}</p>
            <p className={styles["question-answer"]}>{question.answerB}</p>
            <p className={styles["question-answer"]}>{question.answerC}</p>
            <p className={styles["question-answer"]}>{question.answerD}</p>

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