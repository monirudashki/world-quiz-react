import { Link } from 'react-router-dom';
import styles from '../404/404.module.css';

export const PageNotFound = () => {
    return (
        <>
            <div className={styles['page-not-found-container']}>
            </div>
            <div className={styles['page-not-found-container-wrapper']}>
                <h1 className={styles['not-found-h1']}>You arraved to not found land</h1>
                <h2 className={styles['not-found-h2']}>Catch this flight back to <Link className={styles['link-home']} to='/'>HOME</Link></h2>
            </div>
        </>
    );
}