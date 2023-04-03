import styles from '../Jokers/CallFriend.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { gameShowCallFriendJokerToggle } from '../../../+store/features/game';

const phone = <FontAwesomeIcon icon={faPhone} />

export const CallFriend = ({
    gameState,
    game
}) => {

    const dispatch = useDispatch();

    const hideCallFriendHandler = () => {
        dispatch(gameShowCallFriendJokerToggle(false));
    }

    const wrightAnswer = gameState.currentQuestion.wrightAnswer;

    const callAnswers = [
        `I think the wright answer is ${wrightAnswer} , good luck!`,
        `100% you can bet on answer ${wrightAnswer} , smash them current user!`,
        `I'm not sure but i my mind is ${wrightAnswer} , it's your decision!`
    ]

    const answer = callAnswers[Math.floor(Math.random() * callAnswers.length)];

    let letter;

    if (wrightAnswer === gameState.currentQuestion.firstAnswer) {
        letter = 'A'
    } else if (wrightAnswer === gameState.currentQuestion.secondAnswer) {
        letter = "B"
    } else if (wrightAnswer === gameState.currentQuestion.thirdAnswer) {
        letter = "C"
    } else if (wrightAnswer === gameState.currentQuestion.fourthAnswer) {
        letter = "D"
    }

    const callAnswersForFlags = [
        `I think the wright answer is ${letter} , good luck!`,
        `100% you can bet on answer ${letter} , smash them current user!`,
        `I'm not sure but i my mind is ${letter} , it's your decision!`
    ];

    const answerFlag = callAnswersForFlags[Math.floor(Math.random() * callAnswersForFlags.length)];

    return (
        <div data-testid='callFriend-joker' className={styles['call-container']}>
            <div className={styles['call-wrapper']}>
                {game === "Capitals"
                    ?
                    <p data-testid='capitals-joker' className={styles['call-answer']}><span>{phone}</span>... {answer} </p>
                    :
                    <p data-testid='flag-joker' className={styles['call-answer']}><span>{phone}</span>... {answerFlag} </p>
                }
            </div>

            <button type='button' className={styles['commercial-button']} onClick={hideCallFriendHandler}>X</button>
        </div>
    );
}