import styles from '../Result/Result.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import CoinsLives from '../../shared/CoinsLives/Coins&Lives';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import { gameResetState } from '../../../+store/features/game';
import { useResultDispatch, useResultSelector } from '../../../+store/redux-hooks/redux-hooks';
const coins = <FontAwesomeIcon icon={faCoins} />


export const Result = () => {

    const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    const dispatch = useResultDispatch();
    const earnCoins = useResultSelector((state) => state.game.earnCoins);

    let gameWasPlayed = false;

    if (location.state && (location.state.previousPath === '/game-capitals' || location.state.previousPath === '/game-flags')) {
        gameWasPlayed = true;
    }

    const onExitResultHandler = () => {
        dispatch(gameResetState());
    }

    return (
        <>
            <CoinsLives
                coins={currentUser.coins}
                lives={currentUser.lives}
            ></CoinsLives>

            <section className={styles["result-container"]}>
                <h2>RESULTS</h2>
                {gameWasPlayed
                    ?
                    <>
                        <div className={styles["result-coins"]}>
                            <div className={styles["result"]}>
                                <p>Correct Answers</p>
                                <p className={styles["score"]}>{currentUser.lastFiveGames[4]}/25</p>
                            </div>
                            <div className={styles["coins"]}>
                                <p>Earn Coins</p>
                                <p className={styles["score"]}>{earnCoins}{coins}</p>
                            </div>
                        </div>
                        <div className={styles["active-buttons-result"]}>
                            <Link
                                onClick={onExitResultHandler}
                                style={{ pointerEvents: currentUser.lives > 0 ? '' : 'none' }}
                                to="/game-capitals"
                            >RESTART
                            </Link>
                            <Link onClick={onExitResultHandler} to="/">EXIT</Link>
                        </div>
                    </>
                    :
                    <>
                        <div className={styles["result-coins"]}>
                            <h2>You haven't play game yet!</h2>
                        </div>
                        <div className={styles["active-buttons-result"]}>
                            <Link to="/game-capitals">PLAY</Link>
                            <Link to="/">EXIT</Link>
                        </div>
                    </>
                }

            </section>
        </>
    );
}