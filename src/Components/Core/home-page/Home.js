import styles from '../home-page/Home.module.css';
import flagsRunning from '../home-page/home-images/game-running/game flags running.png';
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
                <h1 data-testid={'home-h1'} className={styles["head-h1"]}>World Quiz Games</h1>
            </div>

            <div className={styles['games-img-container']}>
                <div className={styles['games-img-container__item']}>
                    <h2 data-testid={'home-capitals'}>Capitals Quiz</h2>
                    <img data-testid={'home-capitals-img'} src={capitalsRunning} alt="asd" />
                </div>
                <div className={styles['games-img-container__item']}>
                    <h2 data-testid={'home-flags'}>Flags Quiz</h2>
                    <img data-testid={'home-flags-img'} src={flagsRunning} alt="asd" />
                </div>
            </div>

            {currentUser?.roles === 'user' &&
                <div data-testid='home-game-buttons' className={styles['game-buttons']}>
                    <Link
                        data-testid='home-link-capitalsGame'
                        style={{ pointerEvents: currentUser.lives > 0 ? '' : 'none' }}
                        className={styles['button']} to={'/game-capitals'}
                        onClick={onStartGame}
                    >
                        CAPITALS START
                    </Link>
                    <Link
                        data-testid='home-link-flagsGame'
                        className={styles['button']} to={'/game-flags'}
                        style={{ pointerEvents: currentUser.lives > 0 ? '' : 'none' }}
                    >
                        FLAGS START
                    </Link>
                </div>
            }
        </main>
    );
}