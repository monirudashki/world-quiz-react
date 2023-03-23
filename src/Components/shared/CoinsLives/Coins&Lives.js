import styles from '../CoinsLives/Coins&Lives.module.css';

import { memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const moneyCoins = <FontAwesomeIcon icon={faCoins} />
const heart = <FontAwesomeIcon icon={faHeart} />

const CoinsLives = ({
    lives,
    coins
}) => {

    let currentLives = [];

    for (let i = 0; i < lives; i++) {
        currentLives.push(<span style={{ color: 'red' }} key={i}>{heart}</span>)
    }

    if (currentLives.length < 5) {
        const border = 5 - currentLives.length + 10;
        for (let i = 10; i < border; i++) {
            currentLives.push(<span style={{ color: 'black' }} key={i}>{heart}</span>)
        }
    }

    return (
        <div data-testid='coins-and-lives' className={styles["lives"]}>
            <span className={styles["coins"]}>{moneyCoins} {coins}</span>
            <p className={styles["hearts"]}>
                {currentLives}
            </p>
        </div>
    )
}

export default memo(CoinsLives);