import styles from '../CoinsLives/Coins&Lives.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const moneyCoins = <FontAwesomeIcon icon={faCoins} />
const heart = <FontAwesomeIcon icon={faHeart} />

export const CoinsLives = ({
    lives,
    coins
}) => {

    const currentLives = lives.map((live, index) => {
        let style;

        if (live === 0) {
            style = { color: 'black' }
        }

        return (<span style={style} key={index}>{heart}</span>)
    });

    return (<div className={styles["lives"]}>
        <span className={styles["coins"]}>{moneyCoins} {coins}</span>
        <p className={styles["hearts"]}>
            {currentLives}
        </p>
    </div>
    )
}