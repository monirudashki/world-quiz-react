import styles from '../ScoreBoardItem/ScoreBoardItem.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faMedal } from '@fortawesome/free-solid-svg-icons';

const coins = <FontAwesomeIcon icon={faCoins} />
const medal = <FontAwesomeIcon icon={faMedal} />

export const ScoreBoardItem = ({
    user,
    index,
    page,
}) => {

    let place;

    if (page === 1) {
        place = index + 1;
    } else {
        place = (page - 1) * 5 + index + 1;
    }

    let style;
    if (place === 1) {
        style = { color: 'gold' }
    } else if (place === 2) {
        style = { color: 'silver' }
    } else if (place === 3) {
        style = { color: '#cd7f32' }
    }

    const { currentUser } = useContext(AuthContext);
    const isCurrentUser = currentUser.username === user.username;

    return (
        <div className={styles["scoreboard-container__item"]} >
            <div className={styles["scoreboard-container__item__img"]}>
                <img src={user.imageUrl} alt="dsad" />
            </div>
            <div className={styles["scoreboard-container__item__username"]} style={{ backgroundColor: isCurrentUser ? "lightgrey" : 'none' }}>
                <p>{user.username}</p>
            </div>
            <div className={styles["scoreboard-container__item__coins"]} style={{ backgroundColor: isCurrentUser ? "lightgrey" : 'none' }}>
                <p>{user.coins} <span>{coins}</span></p>
            </div>
            <div className={styles["scoreboard-container__item__place"]} >
                {place < 4
                    ?
                    <p style={style}>{medal}</p>
                    :
                    <p>{place}.</p>
                }
            </div>
        </div>
    );
}