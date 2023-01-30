import styles from '../CoinsLives/Coins&Lives.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const coins = <FontAwesomeIcon icon={faCoins} />
const heart = <FontAwesomeIcon icon={faHeart} />

export const CoinsLives = (props) => {

    const lives = props.lives.map((live, index) => (<span key={index}>{heart}</span>)); //look for key

    return (<div className={styles["lives"]}>
        <span className={styles["coins"]}>{coins} {props.coins}</span>
        <p className={styles["hearts"]}>
            {lives}
        </p>
    </div>
    )
}