import styles from '../home-page/Home.module.css';
import image1 from '../../../Assets/images/byciclesProject.png';
import { CoinsLives } from '../../shared/Coins&Lives';
import { useState } from 'react';

export const Home = () => {

    const [currentUser, setCurrentUser] = useState('user');

    return (
        <main className={styles["main"]}>

            {currentUser === 'user' &&
                <CoinsLives
                    coins='8000'
                    lives={[1, 2, 3, 4]}
                ></CoinsLives>
            }

            <div className={styles["head"]}>
                <h1 className={styles["head-h1"]}>World Quiz</h1>
            </div>

            <div className={styles['games-img-container']}>
                <div className={styles['games-img-container__item']}>
                    <img src={image1} alt="asd" />
                </div>
                <div className={styles['games-img-container__item']}>
                    <img src={image1} alt="asd" />
                </div>
            </div>

            <div className={styles['game-buttons']}>
                <button type="button">CAPITOLS START</button>
                <button type="button">FLAGS START</button>
            </div>
        </main>
    );
}