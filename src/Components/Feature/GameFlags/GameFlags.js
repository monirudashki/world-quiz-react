import styles from "../GameFlags/GameFlags.module.css";

import { Timer } from "../../shared/TImes/Times";
import { CoinsLives } from "../../shared/CoinsLives/Coins&Lives";
import { Jokers } from "../Jokers/Jokers";

import flagImage from "../GameFlags/Images/spain.png";

export const GameFlags = () => {
    return (
        <>
            <Timer />

            <CoinsLives
                coins='8000'
                lives={[1, 2, 3, 4]}
            ></CoinsLives>

            <section className={styles['question-container']}>
                <div className={styles['question']}>
                    <p>The Flag of France is?</p>
                </div>

                <div className={styles['answers-container']}>
                    <button type="button" className={styles["answers-container__answer-button"]}>
                        <img src={flagImage} alt="" />
                    </button>
                    <button type="button" className={styles["answers-container__answer-button"]}>
                        <img src={flagImage} alt="" />
                    </button>
                    <button type="button" className={styles["answers-container__answer-button"]}>
                        <img src={flagImage} alt="" />
                    </button>
                    <button type="button" className={styles["answers-container__answer-button"]}>
                        <img src={flagImage} alt="" />
                    </button>
                </div>

                <Jokers />
            </section>

        </>
    );
}