import styles from '../Jokers/Jokers.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const phone = <FontAwesomeIcon icon={faPhone} />
const users = <FontAwesomeIcon icon={faUsers} />

export const Jokers = ({
    showFiftyFiftyHandler
}) => {

    const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);

    const useFiftyFifty = () => {
        setFiftyFiftyUsed(true);
        showFiftyFiftyHandler(true);
    }

    return (
        <div className={styles['jokers']}>
            <button className={styles['jokers__button']}>
                {users}
            </button>
            <button disabled={fiftyFiftyUsed} className={styles['jokers__button']} onClick={useFiftyFifty}>
                50/50
            </button>
            <button className={styles['jokers__button']}>
                {phone}
            </button>
        </div>
    );
}