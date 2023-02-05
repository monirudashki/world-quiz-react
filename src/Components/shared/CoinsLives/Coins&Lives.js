import styles from '../CoinsLives/Coins&Lives.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';

const coins = <FontAwesomeIcon icon={faCoins} />
const heart = <FontAwesomeIcon icon={faHeart} />

export const CoinsLives = () => {

    const { currentUser } = useContext(AuthContext);

    const lives = currentUser.lives.map((live, index) => (<span key={index}>{heart}</span>));

    return (<div className={styles["lives"]}>
        <span className={styles["coins"]}>{coins} {currentUser.coins}</span>
        <p className={styles["hearts"]}>
            {lives}
        </p>
    </div>
    )
}