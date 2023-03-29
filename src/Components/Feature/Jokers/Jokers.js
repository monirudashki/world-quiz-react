import styles from '../Jokers/Jokers.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { gameShowCallFriendJokerToggle, gameShowFiftyFiftyToggle, gameShowPublicJokerToggle } from '../../../+store/features/game';

const phone = <FontAwesomeIcon icon={faPhone} />
const users = <FontAwesomeIcon icon={faUsers} />

const Jokers = ({
    gameState
}) => {

    const dispatch = useDispatch();

    const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
    const useFiftyFifty = () => {
        setFiftyFiftyUsed(true);
        dispatch(gameShowFiftyFiftyToggle(true));
    }

    const [callFriendUsed, setCallFriendUsed] = useState(false);
    const useCallFriend = () => {
        setCallFriendUsed(true);
        dispatch(gameShowCallFriendJokerToggle(true));
    }

    const [publicJokerUsed, setPublicJokerUsed] = useState(false);
    const usePublicJoker = () => {
        setPublicJokerUsed(true);
        dispatch(gameShowPublicJokerToggle(true));
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