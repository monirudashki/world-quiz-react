import styles from '../CapitalsAnswers.js/CapitalAnswers.module.css';

export const CapitalsAnswers = ({
    questions,
    questionNumber,
    addCorrectAnswer,
    nextQuestion,
    showFiftyFifty,
    showFiftyFiftyHandler
}) => {

    const firstAnswer = questions[questionNumber]?.firstAnswer;
    const secondAnswer = questions[questionNumber]?.secondAnswer;
    const thirdAnswer = questions[questionNumber]?.thirdAnswer;
    const fourthAnswer = questions[questionNumber]?.fourthAnswer;
    const wrightAnswer = questions[questionNumber]?.wrightAnswer;

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
            console.log('set time out')
            e.target.className = styles['answers-container__answer-button'];
            showFiftyFiftyHandler(false);
            nextQuestion();
        }, 1000)
    }

    const wrongAnswerArray = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer].filter(x => x !== wrightAnswer);
    const random = wrongAnswerArray[Math.floor(Math.random() * wrongAnswerArray.length)];
    const twoWrongAnswerArray = wrongAnswerArray.filter(x => x !== random);

    return (
        <div className={styles['answers-container']}>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
                disabled={twoWrongAnswerArray.includes(firstAnswer) && showFiftyFifty}
            >
                {firstAnswer}
            </button>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
                disabled={twoWrongAnswerArray.includes(secondAnswer) && showFiftyFifty}
            >
                {secondAnswer}
            </button>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
                disabled={twoWrongAnswerArray.includes(thirdAnswer) && showFiftyFifty}
            >
                {thirdAnswer}
            </button>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
                disabled={twoWrongAnswerArray.includes(fourthAnswer) && showFiftyFifty}
            >
                {fourthAnswer}
            </button>
        </div>
    );
}