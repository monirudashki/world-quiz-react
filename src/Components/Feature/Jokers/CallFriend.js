import styles from '../Jokers/CallFriend.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const phone = <FontAwesomeIcon icon={faPhone} />

export const CallFriend = ({
    showCallFriendJokerHandler,
    question
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

    return (
        <div className={styles['call-container']}>
            <div className={styles['call-wrapper']}>
                <p className={styles['call-answer']}><span>{phone}</span>... {answer} </p>
            </div>

            <button type='button' className={styles['commercial-button']} onClick={hideCallFriendHandler}>X</button>
        </div>
    );
}