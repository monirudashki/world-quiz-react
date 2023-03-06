import styles from '../Jokers/Jokers.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { memo } from 'react';

const phone = <FontAwesomeIcon icon={faPhone} />
const users = <FontAwesomeIcon icon={faUsers} />

const Jokers = ({
    showFiftyFiftyHandler,
    showCallFriendJokerHandler,
    showPublicJokerHandler
}) => {

    const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
    const useFiftyFifty = () => {
        setFiftyFiftyUsed(true);
        showFiftyFiftyHandler(true);
    }

    const [callFriendUsed, setCallFriendUsed] = useState(false);
    const useCallFriend = () => {
        setCallFriendUsed(true);
        showCallFriendJokerHandler(true);
    }

    const [publicJokerUsed, setPublicJokerUsed] = useState(false);
    const usePublicJoker = () => {
        setPublicJokerUsed(true);
        showPublicJokerHandler(true);
    }

    return (
        <div className={styles['jokers']}>
            <button disabled={publicJokerUsed} className={styles['jokers__button']} onClick={usePublicJoker}>
                {users}
            </button>
            <button disabled={fiftyFiftyUsed} className={styles['jokers__button']} onClick={useFiftyFifty}>
                50/50
            </button>
            <button disabled={callFriendUsed} className={styles['jokers__button']} onClick={useCallFriend}>
                {phone}
            </button>
        </div>
    );
}

export default memo(Jokers);