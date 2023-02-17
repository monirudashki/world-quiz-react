import { CoinsLives } from '../../shared/CoinsLives/Coins&Lives';
import styles from '../Result/Result.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import { GameCapitalsContext } from '../../../Contexts/GameCapitalsContext';
const coins = <FontAwesomeIcon icon={faCoins} />


export const Result = () => {

    const { currentUser } = useContext(AuthContext);
    const { gameEarnCoins } = useContext(GameCapitalsContext);

    return (
        <>
            <CoinsLives
                coins={currentUser?.coins}
                lives={currentUser?.lives}
            ></CoinsLives>

            <section className={styles["result-container"]}>
                <h2>RESULTS</h2>
                <div className={styles["result-coins"]}>
                    <div className={styles["result"]}>
                        <p>Correct Answers</p>
                        <p className={styles["score"]}>{currentUser?.lastFiveGames[4]}/25</p>
                    </div>
                    <div className={styles["coins"]}>
                        <p>Earn Coins</p>
                        <p className={styles["score"]}>{gameEarnCoins}{coins}</p>
                    </div>
                </div>
                <div className={styles["active-buttons-result"]}>
                    <Link to="/game-capitals">RESTART</Link>
                    <Link to="/">EXIT</Link>
                </div>
            </section>
        </>
    );
}