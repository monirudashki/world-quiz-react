import styles from '../ScoreBoardItem/ScoreBoardItem.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';
const coins = <FontAwesomeIcon icon={faCoins} />

export const ScoreBoardItem = ({
    user,
    index,
    page,
}) => {

    let place;

    if (page === 1) {
        place = index + 1;
    } else {
        place = (page - 1) * 5 + index;
    }

    const { currentUser } = useContext(AuthContext);
    const isCurrentUser = currentUser.username === user.username;

    return (
        <div className={styles["scoreboard-container__item"]} >
            <div className={styles["scoreboard-container__item__img"]}>
                <img src={user.imageUrl} alt="dsad" />
            </div>
            <div className={styles["scoreboard-container__item__username"]} style={{ backgroundColor: isCurrentUser ? "lightgreen" : 'none' }}>
                <p>{user.username}</p>
            </div>
            <div className={styles["scoreboard-container__item__coins"]} >
                <p>{user.coins} <span>{coins}</span></p>
            </div>
            <div className={styles["scoreboard-container__item__place"]} >
                <p>{place}.</p>
            </div>
        </div>
    );
}