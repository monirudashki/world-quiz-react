import styles from '../home-page/Home.module.css';
import image1 from '../../../Assets/images/byciclesProject.png';
import { CoinsLives } from '../../shared/CoinsLives/Coins&Lives';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthContext';

export const Home = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <main className={styles["main"]}>

            {currentUser?.roles === 'user' &&
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

            {currentUser?.roles === 'user' &&
                <div className={styles['game-buttons']}>
                    <Link className={styles['button']} to={'/game-capitals'}>CAPITOLS START</Link>
                    <Link className={styles['button']} to={'/game-flags'}>FLAGS START</Link>
                </div>
            }
        </main>
    );
}