import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameAddCorrectAnswer, gameCurrentQuestion, gameFinishToggle, gameNextQuestion, gameShowFiftyFiftyToggle } from '../../../../+store/features/game';
import styles from '../CapitalsAnswers.js/CapitalAnswers.module.css';

export const CapitalsAnswers = ({
    gameState
}) => {

    const [answerIsGiven, setAnswerIsGiven] = useState(false);
    const currentQuestion = gameState.currentQuestion;
    const dispatch = useDispatch();

    const firstAnswer = currentQuestion?.firstAnswer;
    const secondAnswer = currentQuestion?.secondAnswer;
    const thirdAnswer = currentQuestion?.thirdAnswer;
    const fourthAnswer = currentQuestion?.fourthAnswer;
    const wrightAnswer = currentQuestion?.wrightAnswer;

    let className = styles['answers-container__answer-button'];

    const giveAnswer = (e) => {
        e.preventDefault();
        setAnswerIsGiven(true);
        if (e.target.textContent === currentQuestion.wrightAnswer) {
            e.target.className = styles['answers-container__answer-buttonCorrect'];
            dispatch(gameAddCorrectAnswer());
        } else {
            e.target.className = styles['answers-container__answer-buttonWrong']
        }

        setTimeout(() => {
            e.target.className = styles['answers-container__answer-button'];
            dispatch(gameShowFiftyFiftyToggle(false));
            if (gameState.questionNumber === 25) {
                dispatch(gameFinishToggle(true));
            }
            setAnswerIsGiven(false);
            dispatch(gameNextQuestion());
            dispatch(gameCurrentQuestion(gameState.questions[gameState.questionNumber]));
        }, 1000)
    }

    const wrongAnswerArray = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer].filter(x => x !== wrightAnswer);
    const random = wrongAnswerArray[Math.floor(Math.random() * wrongAnswerArray.length)];
    const twoWrongAnswerArray = wrongAnswerArray.filter(x => x !== random);

    let styleFirstAnswer;
    let styleSecondAnswer;
    let styleThirdAnswer;
    let styleFourthAnswer;

    if (twoWrongAnswerArray.includes(firstAnswer) && gameState.showFiftyFifty === true) {
        styleFirstAnswer = { backgroundColor: 'red' };
    }

    if (twoWrongAnswerArray.includes(secondAnswer) && gameState.showFiftyFifty === true) {
        styleSecondAnswer = { backgroundColor: 'red' };
    }

    if (twoWrongAnswerArray.includes(thirdAnswer) && gameState.showFiftyFifty === true) {
        styleThirdAnswer = { backgroundColor: 'red' };
    }

    if (twoWrongAnswerArray.includes(fourthAnswer) && gameState.showFiftyFifty === true) {
        styleFourthAnswer = { backgroundColor: 'red' };
    }

    return (
        <div data-test-id='capitals-answers' className={styles['answers-container']}>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
                style={answerIsGiven ? null : styleFirstAnswer}
                disabled={(twoWrongAnswerArray.includes(firstAnswer) && gameState.showFiftyFifty === true) || answerIsGiven}
            >
                {firstAnswer}
            </button>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
                style={answerIsGiven ? null : styleSecondAnswer}
                disabled={(twoWrongAnswerArray.includes(secondAnswer) && gameState.showFiftyFifty === true) || answerIsGiven}
            >
                {secondAnswer}
            </button>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
                style={answerIsGiven ? null : styleThirdAnswer}
                disabled={(twoWrongAnswerArray.includes(thirdAnswer) && gameState.showFiftyFifty === true) || answerIsGiven}
            >
                {thirdAnswer}
            </button>
            <button
                onClick={giveAnswer}
                type="button"
                className={className}
                style={answerIsGiven ? null : styleFourthAnswer}
                disabled={(twoWrongAnswerArray.includes(fourthAnswer) && gameState.showFiftyFifty === true) || answerIsGiven}
            >
                {fourthAnswer}
            </button>
        </div>
    );
}