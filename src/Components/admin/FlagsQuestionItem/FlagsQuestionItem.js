import styles from '../FlagsQuestionItem/FlagsQuestionItem.module.css';

export const FlagsQuestionItem = (question) => {
    return (
        <div className={styles['question-item']}>
            <h2>Flag {question.title}</h2>
            <div className={styles['question-answers']}>
                <div className={styles['question-img-container']}>
                    <img src={question.answerA} alt='' className={styles['question-img']} />
                </div>
                <div className={styles['question-img-container']}>
                    <img src={question.answerB} alt={question.answerB} className={styles['question-img']} />
                </div>
                <div className={styles['question-img-container']}>
                    <img src={question.answerC} alt={question.answerC} className={styles['question-img']} />
                </div>
                <div className={styles['question-img-container']}>
                    <img src={question.answerD} alt={question.answerD} className={styles['question-img']} />
                </div>
            </div>

            <div className={styles['right-answer-container']}>
                <p>Wright answer:</p>
                <img src={question.wrightAnswer} alt="sda" />
            </div>

            <div className={styles['action-buttons']}>
                <button type="button" className={styles['action-button']}>EDIT</button>
                <button type="button" className={styles['action-button']}>DELETE</button>
            </div>
        </div>
    );
}