import styles from '../GameCapitals/GameCapitals.module.css';

import { Link } from 'react-router-dom';
// import { Spinner } from '../../shared/Spinner.js/Spinner';
import { Timer } from '../../shared/TImes/Times';
import { CoinsLives } from '../../shared/CoinsLives/Coins&Lives';
import { Jokers } from '../Jokers/Jokers';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import { GameCapitalsContext } from '../../../Contexts/GameCapitalsContext';
import { CapitalsAnswers } from './CapitalsAnswers.js/CapitalsAnswers';

export const GameCapitals = () => {

    const { questions } = useContext(GameCapitalsContext);
    const { currentUser } = useContext(AuthContext);

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const addCorrectAnswer = () => {
        setCorrectAnswers(value => value + 1);
    };

    const coinsAfterCharge = Number(currentUser?.coins) - 2000; // useMemo or useRef
    //TODO lives correct charge

    const [questionNumber, setQuestionsNumber] = useState(0);
    const nextQuestion = () => {
        setQuestionsNumber(value => value + 1);
    };

    const [showFiftyFifty, setShowFiftyFifty] = useState(false);
    const showFiftyFiftyHandler = (boolean) => {
        setShowFiftyFifty(boolean);
    }

    if (questionNumber === 11) { //TODO 25
        // correct answers
        //charge lives
        // util functions for earn coins 

        //fetch data rest api (update user)

        //navigate to result
    }

    return (
        <>
            <div className={styles['header']}>
                <p className={styles['header__head']}>GAME CAPITALS</p>
                <Link to='/'>EXIT</Link>
            </div>

            <Timer
                nextQuestion={nextQuestion}
                questionNumber={questionNumber}
                showFiftyFiftyHandler={showFiftyFiftyHandler}
            />

            <CoinsLives
                coins={coinsAfterCharge}
                lives={currentUser?.lives}
            ></CoinsLives>

            <section className={styles['question-container']}>
                <div className={styles['question']}>
                    <p>The Capital of {questions[questionNumber]?.title} is?</p>
                </div>

                <CapitalsAnswers
                    questions={questions}
                    questionNumber={questionNumber}
                    addCorrectAnswer={addCorrectAnswer}
                    nextQuestion={nextQuestion}
                    showFiftyFifty={showFiftyFifty}
                    showFiftyFiftyHandler={showFiftyFiftyHandler}
                />

                <Jokers
                    showFiftyFiftyHandler={showFiftyFiftyHandler}
                />

            </section>
            <div className={styles['number-container']}>
                <p className={styles['number']}>{Number(questionNumber) + 1}</p>
            </div>
        </>
    );
}