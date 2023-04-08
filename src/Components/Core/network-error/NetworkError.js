import styles from './NetworkError.module.css';

export const NetworkError = () => {
    return (
        <div className={styles['network-error-container']}>
            <h1 className={styles['network-error-container__h1']}>Network Error</h1>
            <h2 className={styles['network-error-container__h2']}>Sorry , come back later</h2>
        </div>
    )
}