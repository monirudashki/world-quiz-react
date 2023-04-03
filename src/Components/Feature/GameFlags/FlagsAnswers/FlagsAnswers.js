import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameAddCorrectAnswer, gameCurrentQuestion, gameFinishToggle, gameNextQuestion, gameShowFiftyFiftyToggle } from '../../../../+store/features/game';
import styles from './FlagsAnswers.module.css';

export const FlagsAnswers = ({
    gameState,
}) => {

    const [answerIsGiven, setAnswerIsGiven] = useState(false);
    const currentQuestion = gameState.currentQuestion;

    const dispatch = useDispatch();

    const firstAnswer = currentQuestion?.firstAnswer;
    const secondAnswer = currentQuestion?.secondAnswer;
    const thirdAnswer = currentQuestion?.thirdAnswer;
    const fourthAnswer = currentQuestion?.fourthAnswer;
    const wrightAnswer = currentQuestion?.wrightAnswer;

    let className = styles['answer-flag-button'];

    const giveAnswer = (e) => {
        e.preventDefault();
        setAnswerIsGiven(true);
        if (e.target.id === currentQuestion.wrightAnswer) {
            e.target.className = styles['answer-flag-button-correct'];
            dispatch(gameAddCorrectAnswer());
        } else {
            e.target.className = styles['answer-flag-button-wrong']
        }

        setTimeout(() => {
            e.target.className = styles['answer-flag-button'];
            dispatch(gameShowFiftyFiftyToggle(false));
            if (gameState.questionNumber === 25) {
                dispatch(gameFinishToggle(true));
            }
            setAnswerIsGiven(false);
            dispatch(gameNextQuestion());
            dispatch(gameCurrentQuestion(gameState.questions[gameState.questionNumber]));
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
                    disabled={(twoWrongAnswerArray.includes(firstAnswer) && gameState.showFiftyFifty === true) || answerIsGiven}
                >
                    A
                </button>
                <div className={styles['img-wrapper']}>
                    <img data-testid='firstAnswer-img' src={`../images/Flags/${firstAnswer}.png`} alt="" />
                </div>
            </div>

            <div className={styles['answers-container__flag-wrapper']}>
                <button
                    id={secondAnswer}
                    type='button'
                    onClick={giveAnswer}
                    className={className}
                    disabled={(twoWrongAnswerArray.includes(secondAnswer) && gameState.showFiftyFifty === true) || answerIsGiven}
                >
                    B
                </button>
                <div className={styles['img-wrapper']}>
                    <img data-testid='secondAnswer-img' src={`../images/Flags/${secondAnswer}.png`} alt="" />
                </div>
            </div>

            <div className={styles['answers-container__flag-wrapper']}>
                <button
                    id={thirdAnswer}
                    type='button'
                    onClick={giveAnswer}
                    className={className}
                    disabled={(twoWrongAnswerArray.includes(thirdAnswer) && gameState.showFiftyFifty === true) || answerIsGiven}
                >
                    C
                </button>
                <div className={styles['img-wrapper']}>
                    <img data-testid='thirdAnswer-img' src={`../images/Flags/${thirdAnswer}.png`} alt="" />
                </div>
            </div>

            <div className={styles['answers-container__flag-wrapper']}>
                <button
                    id={fourthAnswer}
                    type='button'
                    onClick={giveAnswer}
                    className={className}
                    disabled={(twoWrongAnswerArray.includes(fourthAnswer) && gameState.showFiftyFifty) || answerIsGiven}
                >
                    D
                </button>
                <div className={styles['img-wrapper']}>
                    <img data-testid='fourthAnswer-img' src={`../images/Flags/${fourthAnswer}.png`} alt="" />
                </div>
            </div>
        </div>
    );
}