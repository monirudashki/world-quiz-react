import { CoinsLives } from '../../shared/CoinsLives/Coins&Lives';
import styles from '../Result/Result.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
const coins = <FontAwesomeIcon icon={faCoins} />


export const Result = () => {
    return (
        <>
            <CoinsLives
                coins='8000'
                lives={[1, 2, 3, 4]}
            ></CoinsLives>

            <section className={styles["result-container"]}>
                <h2>RESULTS</h2>
                <div className={styles["result-coins"]}>
                    <div className={styles["result"]}>
                        <p>Correct Answers</p>
                        <p className={styles["score"]}>16/25</p>
                    </div>
                    <div className={styles["coins"]}>
                        <p>Earn Coins</p>
                        <p className={styles["score"]}>10000{coins}</p>
                    </div>
                </div>
                <div className={styles["active-buttons-result"]}>
                    <a href="#">RESTART</a>
                    <a href="#">EXIT</a>
                </div>
            </section>
        </>
    );
}