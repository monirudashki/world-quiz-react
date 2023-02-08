import styles from '../FlagsQuestionItem/FlagsQuestionItem.module.css';

import { Link } from 'react-router-dom';

export const FlagsQuestionItem = ({
    question,
    setIsQuestionDeletedHandler,
    questionsLength,
    page,
    setCurrentPageHandler,
}) => {

    const deleteQuestionHandler = async () => {
        try {
            const response = await fetch(`http://localhost:3030/api/flags/${question._id}/delete`, {
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
        <div className={styles['question-item']}>
            <h2>Flag {question.title}</h2>
            <div className={styles['question-answers']}>
                <div className={styles['question-img-container']}>
                    <img src={`../images/${question.firstAnswer}.png`} alt={question.answerA} className={styles['question-img']} />
                </div>
                <div className={styles['question-img-container']}>
                    <img src={`../images/${question.secondAnswer}.png`} alt={question.answerB} className={styles['question-img']} />
                </div>
                <div className={styles['question-img-container']}>
                    <img src={`../images/${question.thirdAnswer}.png`} alt={question.answerC} className={styles['question-img']} />
                </div>
                <div className={styles['question-img-container']}>
                    <img src={`../images/${question.fourthAnswer}.png`} alt={question.answerD} className={styles['question-img']} />
                </div>
            </div>

            <div className={styles['right-answer-container']}>
                <p>Wright answer:</p>
                <img src={`../images/${question.wrightAnswer}.png`} alt="sda" />
            </div>

            <div className={styles['action-buttons']}>
                <Link to={`/admin/flags-question/${question._id}/edit`} className={styles['action-button']}>EDIT</Link>
                <button type="button" className={styles['action-button']} onClick={deleteQuestionHandler}>DELETE</button>
            </div>
        </div>
    );
}