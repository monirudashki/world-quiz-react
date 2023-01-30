import styles from '../ScoreBoardItem/ScoreBoardItem.module.css';
import profileImg from '../images/profile.jfif';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
const coins = <FontAwesomeIcon icon={faCoins} />

export const ScoreBoardItem = (props) => {
    return (
        <div className={styles["scoreboard-container__item"]}>
            <div className={styles["scoreboard-container__item__img"]}>
                <img src={profileImg} alt="" />
            </div>
            <div className={styles["scoreboard-container__item__username"]}>
                <p>{props.user.username}</p>
            </div>
            <div className={styles["scoreboard-container__item__coins"]}>
                <p>{props.user.coins} <span>{coins}</span></p>
            </div>
            <div className={styles["scoreboard-container__item__place"]}>
                <p>{props.user.place}.</p>
            </div>
        </div>
    );
}