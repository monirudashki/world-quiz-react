import { useState } from 'react';
import styles from './FlagsAnswers.module.css';

export const FlagsAnswers = ({
    questions,
    questionNumber,
    addCorrectAnswer,
    nextQuestion,
    showFiftyFifty,
    showFiftyFiftyHandler,
    setGameFinishHandler
}) => {

    const [answerIsGiven, setAnswerIsGiven] = useState(false);

    const firstAnswer = questions[questionNumber]?.firstAnswer;
    const secondAnswer = questions[questionNumber]?.secondAnswer;
    const thirdAnswer = questions[questionNumber]?.thirdAnswer;
    const fourthAnswer = questions[questionNumber]?.fourthAnswer;
    const wrightAnswer = questions[questionNumber]?.wrightAnswer;

    let className = styles['answer-flag-button'];

    const giveAnswer = (e) => {
        e.preventDefault();
        setAnswerIsGiven(true);
        if (e.target.id === questions[questionNumber].wrightAnswer) {
            e.target.className = styles['answer-flag-button-correct'];
            addCorrectAnswer();
        } else {
            e.target.className = styles['answer-flag-button-wrong']
        }

        setTimeout(() => {
            e.target.className = styles['answer-flag-button'];
            showFiftyFiftyHandler(false);
            if (questionNumber === 25) {
                setGameFinishHandler();
            }
            setAnswerIsGiven(false);
            nextQuestion();
        }, 1000);
    }

    const wrongAnswerArray = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer].filter(x => x !== wrightAnswer);
    const random = wrongAnswerArray[Math.floor(Math.random() * wrongAnswerArray.length)];
    const twoWrongAnswerArray = wrongAnswerArray.filter(x => x !== random);

    return (
        <div className={styles['answers-container']}>
            <div className={styles['answers-container__flag-wrapper']}>
                <button
                    id={firstAnswer}
                    type='button'
                    onClick={giveAnswer}
                    className={className}
                    disabled={(twoWrongAnswerArray.includes(firstAnswer) && showFiftyFifty) || answerIsGiven}
                >
                    A
                </button>
                <div className={styles['img-wrapper']}>
                    <img src={`../images/Flags/${firstAnswer}.png`} alt="" />
                </div>
            </div>

            <div className={styles['answers-container__flag-wrapper']}>
                <button
                    id={secondAnswer}
                    type='button'
                    onClick={giveAnswer}
                    className={className}
                    disabled={(twoWrongAnswerArray.includes(secondAnswer) && showFiftyFifty) || answerIsGiven}
                >B</button>
                <div className={styles['img-wrapper']}>
                    <img src={`../images/Flags/${secondAnswer}.png`} alt="" />
                </div>
            </div>

            <div className={styles['answers-container__flag-wrapper']}>
                <button
                    id={thirdAnswer}
                    type='button'
                    onClick={giveAnswer}
                    className={className}
                    disabled={(twoWrongAnswerArray.includes(thirdAnswer) && showFiftyFifty) || answerIsGiven}
                >C</button>
                <div className={styles['img-wrapper']}>
                    <img src={`../images/Flags/${thirdAnswer}.png`} alt="" />
                </div>
            </div>

            <div className={styles['answers-container__flag-wrapper']}>
                <button
                    id={fourthAnswer}
                    type='button'
                    onClick={giveAnswer}
                    className={className}
                    disabled={(twoWrongAnswerArray.includes(fourthAnswer) && showFiftyFifty) || answerIsGiven}
                >D</button>
                <div className={styles['img-wrapper']}>
                    <img src={`../images/Flags/${fourthAnswer}.png`} alt="" />
                </div>
            </div>
        </div>
    );
}