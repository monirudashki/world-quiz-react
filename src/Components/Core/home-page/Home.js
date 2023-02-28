import styles from '../home-page/Home.module.css';
import random from '../../info/Rules/images/capitals.png';
import capitalsRunning from '../home-page/home-images/game-running/capitals-running.png';
import CoinsLives from '../../shared/CoinsLives/Coins&Lives';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthContext';
import { GameCapitalsContext } from '../../../Contexts/GameCapitalsContext';

export const Home = () => {

    const { currentUser } = useContext(AuthContext);
    const { setNewGameHandler, questions } = useContext(GameCapitalsContext);

    const onStartGame = () => {
        if (questions.length === 0) {
            setNewGameHandler(true);
        }
    }

    return (
        <main className={styles["main"]}>

            {currentUser?.roles === 'user' &&
                <CoinsLives
                    coins={currentUser.coins}
                    lives={currentUser.lives}
                ></CoinsLives>
            }

            <div className={styles["head"]}>
                <h1 className={styles["head-h1"]}>World Quiz Games</h1>
            </div>

            <div className={styles['games-img-container']}>
                <div className={styles['games-img-container__item']}>
                    <h2>Capitals Quiz</h2>
                    <img src={capitalsRunning} alt="asd" />
                </div>
                <div className={styles['games-img-container__item']}>
                    <h2>Flags Quiz</h2>
                    <img src={random} alt="asd" />
                </div>
            </div>

            {currentUser?.roles === 'user' &&
                <div className={styles['game-buttons']}>
                    <Link
                        style={{ pointerEvents: currentUser.lives > 0 ? '' : 'none' }}
                        className={styles['button']} to={'/game-capitals'}
                        onClick={onStartGame}
                    >
                        CAPITALS START
                    </Link>
                    <Link className={styles['button']} to={'/game-flags'}>FLAGS START</Link>
                </div>
            }
        </main>
    );
}