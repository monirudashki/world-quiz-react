import styles from '../Jokers/Jokers.module.css';

export const Jokers = () => {
    return (
        <div className={styles['jokers']}>
            <button className={styles['jokers__button']}>
                -1
            </button>
            <button className={styles['jokers__button']}>
                50/50
            </button>
            <button className={styles['jokers__button']}>
                <i class="fa-solid fa-square-check"></i>
            </button>
        </div>
    );
}