import styles from "../CapitalsQuestionItem/CapitalQuestionItem.module.css";

import { Link } from 'react-router-dom';

export const CapitalsQuestionItem = ({
    question,
    setIsQuestionDeletedHandler,
    questionsLength,
    page,
    setCurrentPageHandler,
}) => {
    const deleteQuestionHandler = async () => {
        try {
            const response = await fetch(`http://localhost:3030/api/capitals/${question._id}/delete`, {
                method: "DELETE",
                headers: {
                    "Content-type": 'Application/json'
                },
                credentials: 'include',
            });

            const result = response.json();
            if (result) {
                if (questionsLength === 1 && page > 1) {
                    return setCurrentPageHandler(page);
                }
                setIsQuestionDeletedHandler(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

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
                <Link to={`/admin/capitals-questions/${question._id}/edit`} className={styles['action-button']}>Edit</Link>
                <button type="button" className={styles['action-button']} onClick={deleteQuestionHandler}>Delete</button>
            </div>
        </div>
    );
}