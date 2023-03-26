import { useEffect, useState } from 'react';
import styles from '../Commercial/Commercial.module.css';

import image from '../Commercial/git-hub.png';

import { userEarnLives } from '../../../../Services/authService';

export const Commercial = ({
    onEarnLivesHandler,
    currentUserLoginHandler
}) => {

    useEffect(() => {
        return () => clearTimeout(timeOut);
    })

    const [timer, setTimer] = useState(5);

    const timeOut = setTimeout(() => {
        if (timer > 0) {
            setTimer(timer - 1);
        }
    }, 1000);

    if (timer === 0) {
        setTimer("X");
    }

    const earnLivesHandler = async () => {
        const result = await userEarnLives();
        currentUserLoginHandler(result);
        onEarnLivesHandler(false);
    }

    return (
        <div data-testid='commercial' className={styles['commercial-container']}>
            <div className={styles['img-wrapper']}>
                <a data-testid='commercial-href' href="https://github.com/monirudashki?tab=repositories">
                    <img data-testid='commercial-img' src={image} alt="loading.." />
                </a>
            </div>

            <button data-testid='commercial-button' type='button' disabled={timer !== "X"} className={styles['commercial-button']} onClick={earnLivesHandler}>{timer}</button>
        </div>
    );
}