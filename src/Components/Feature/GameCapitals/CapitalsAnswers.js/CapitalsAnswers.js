import styles from '../CapitalsAnswers.js/CapitalAnswers.module.css';

export const CapitalsAnswers = ({
    questions,
    questionNumber,
    addCorrectAnswer,
    nextQuestion
}) => {

    let className = styles['answers-container__answer-button']

    const giveAnswer = (e) => {
        e.preventDefault();
        if (e.target.textContent === questions[questionNumber].wrightAnswer) {
            e.target.className = styles['answers-container__answer-buttonCorrect'];
            addCorrectAnswer();
        } else {
            e.target.className = styles['answers-container__answer-buttonWrong']
        }

        setTimeout(() => {
            e.target.className = styles['answers-container__answer-button']
            nextQuestion();
        }, 1000)
    }

    return (
        <div className={styles['answers-container']}>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
            >
                {questions[questionNumber]?.firstAnswer}
            </button>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
            >
                {questions[questionNumber]?.secondAnswer}
            </button>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
            >
                {questions[questionNumber]?.thirdAnswer}
            </button>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
            >
                {questions[questionNumber]?.fourthAnswer}
            </button>
        </div>
    );
}