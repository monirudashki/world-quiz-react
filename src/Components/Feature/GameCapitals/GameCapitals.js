import styles from '../GameCapitals/GameCapitals.module.css';

import { Timer } from '../../shared/TImes/Times';
import { CoinsLives } from '../../shared/CoinsLives/Coins&Lives';
import { Jokers } from '../Jokers/Jokers';

export const GameCapitals = () => {
    return (
        <>
            <Timer />

            <CoinsLives
                coins='8000'
                lives={[1, 2, 3, 4]}
            ></CoinsLives>

            <section className={styles['question-container']}>
                <div className={styles['question']}>
                    <p>The Capital of Sweden is?</p>
                </div>

                <div className={styles['answers-container']}>
                    <button type="button" className={styles['answers-container__answer-button']}>
                        Sweden
                    </button>
                    <button type="button" className={styles['answers-container__answer-button']}>
                        Brazil
                    </button>
                    <button type="button" className={styles['answers-container__answer-button']}>
                        Spain
                    </button>
                    <button type="button" className={styles['answers-container__answer-button']}>
                        USA
                    </button>
                </div>

                <Jokers />

            </section>
        </>
    );
}