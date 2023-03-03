import styles from '../Jokers/CallFriend.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const phone = <FontAwesomeIcon icon={faPhone} />

export const CallFriend = ({
    showCallFriendJokerHandler,
    question,
    game
}) => {

    const hideCallFriendHandler = () => {
        showCallFriendJokerHandler(false);
    }

    const wrightAnswer = question.wrightAnswer;

    const callAnswers = [
        `I think the wright answer is ${wrightAnswer} , good luck!`,
        `100% you can bet on answer ${wrightAnswer} , smash them current user!`,
        `I'm not sure but i my mind is ${wrightAnswer} , it's your decision!`
    ]

    const answer = callAnswers[Math.floor(Math.random() * callAnswers.length)];

    let letter;

    if (wrightAnswer === question.firstAnswer) {
        letter = 'A'
    } else if (wrightAnswer === question.secondAnswer) {
        letter = "B"
    } else if (wrightAnswer === question.thirdAnswer) {
        letter = "C"
    } else if (wrightAnswer === question.fourthAnswer) {
        letter = "D"
    }

    const callAnswersForFlags = [
        `I think the wright answer is ${letter} , good luck!`,
        `100% you can bet on answer ${letter} , smash them current user!`,
        `I'm not sure but i my mind is ${letter} , it's your decision!`
    ];

    const answerFlag = callAnswersForFlags[Math.floor(Math.random() * callAnswersForFlags.length)];

    return (
        <div className={styles['call-container']}>
            <div className={styles['call-wrapper']}>
                {game === "Capitals"
                    ?
                    <p className={styles['call-answer']}><span>{phone}</span>... {answer} </p>
                    :
                    <p className={styles['call-answer']}><span>{phone}</span>... {answerFlag} </p>
                }
            </div>

            <button type='button' className={styles['commercial-button']} onClick={hideCallFriendHandler}>X</button>
        </div>
    );
}