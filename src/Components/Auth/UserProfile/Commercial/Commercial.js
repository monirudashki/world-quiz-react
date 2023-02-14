import { useState } from 'react';
import styles from '../Commercial/Commercial.module.css';

import image from '../Commercial/git-hub.png';

import { userEarnCoins } from '../../../../Services/authService';

export const Commercial = ({
    onEarnCoinsHandler,
    currentUserLoginHandler
}) => {

    const [timer, setTimer] = useState(5);

    setTimeout(() => {
        if (timer > 0) {
            setTimer(timer - 1);
        }
    }, 1000);

    if (timer === 0) {
        setTimer("X");
    }

    const earnCoinsHandler = async () => {
        const result = await userEarnCoins();
        currentUserLoginHandler(result);
        onEarnCoinsHandler(false);
    }

    return (
        <div className={styles['commercial-container']}>
            <div className={styles['img-wrapper']}>
                <a href="https://github.com/monirudashki?tab=repositories">
                    <img src={image} alt="loading.." />
                </a>
            </div>

            <button type='button' disabled={timer !== "X"} className={styles['commercial-button']} onClick={earnCoinsHandler}>{timer}</button>
        </div>
    );
}