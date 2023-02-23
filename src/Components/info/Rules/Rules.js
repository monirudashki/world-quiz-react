import styles from '../Rules/Rules.module.css';
import imageCapitals from './images/capitals.png';
import imageFlags from './images/297005.jpg';
import { memo } from 'react';

const Rules = () => {
    return (
        <div className={styles["rules-container"]}>
            <div className={styles["rules-container__capitals"]}>
                <img src={imageCapitals} alt="dsads" />
                <h3>Capitals</h3>
                <p className={styles['explain']}>Game for improve your knowledge about capitals in the world.
                    25 questions , 60 seconds for every question , 3 jokers,
                    'Public help', 'Call a friend' and '50/50'.
                </p>
            </div>
            <div className={styles["rules-container__flags"]}>
                <img src={imageFlags} alt="sdads" />
                <h3>Flags</h3>
                <p className={styles['explain']}>
                    Game for improve your knowledge about flags in the world.
                    25 questions , 60 seconds for every question , 3 jokers,
                    'Public help', 'Call a friend' and '50/50'.
                </p>
            </div>
            <div className={styles["rules-container__info"]}>
                <h2>Rules</h2>
                <p>
                    Every player have initial 5 lives and 5000 coins. For play one of games , each competitor must give
                    one live (you can recover your hearts from your profile). After game your score is updated. <br />
                    Your level depends of all correct answers you give for both games. <br />
                    Preposition from your result you are earning coins <br />
                    0/10 answers = 0 coins <br />
                    10/15 answers = 2000 coins <br />
                    15/20 answers = 3500 coins <br />
                    20/25 answers = 5000 coins <br />
                    You can look for your position in Scoreboard. Good luck!
                </p>
            </div>
        </div>
    );
}

export default memo(Rules)