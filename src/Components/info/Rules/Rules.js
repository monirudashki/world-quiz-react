import styles from '../Rules/Rules.module.css';
import imageCapitals from './images/babystroller.png';
import imageFlags from './images/babystroller.png';

export const Rules = () => {
    return (
        <div className={styles["rules-container"]}>
            <div className={styles["rules-container__capitals"]}>
                <img src={imageCapitals} alt="dsads" />
                <h3>Capitals</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, vitae illo assumenda laboriosam saepe
                    ratione, quos molestias </p>
            </div>
            <div className={styles["rules-container__flags"]}>
                <img src={imageFlags} alt="sdads" />
                <h3>Flags</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, vitae illo assumenda laboriosam saepe
                    ratione, quos molestias </p>
            </div>
            <div className={styles["rules-container__info"]}>
                <h2>Rules</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, neque odio.
                    Iusto doloribus voluptas unde. Impedit sapiente iusto sit quidem? Eius aliquid ea, qui maiores atque aut
                    neque ipsum deleniti! Lorem,
                    ipsum dolor sit amet consectetur adipisicing elit. Excepturi, veniam culpa? Quo
                    officiis similique nulla, commodi nisi tempore fuga mollitia quas corporis aspernatur? Tempore beatae
                    delectus accusamus ipsum, quod vero!</p>
            </div>
        </div>
    );
}