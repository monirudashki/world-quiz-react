import styles from '../UserProfile/UserProfile.module.css';

import { memo } from 'react';

const Graph = ({
    lastFiveGames
}) => {
    let graphStyle1 = { gridColumn: 2, '--h': getPercentage(lastFiveGames[0]) };
    let graphStyle2 = { gridColumn: 3, '--h': getPercentage(lastFiveGames[1]) };
    let graphStyle3 = { gridColumn: 4, '--h': getPercentage(lastFiveGames[2]) };
    let graphStyle4 = { gridColumn: 5, '--h': getPercentage(lastFiveGames[3]) };
    let graphStyle5 = { gridColumn: 6, '--h': getPercentage(lastFiveGames[4]) };

    return (
        <>
            <h2>Last 5 games score graph</h2>
            <figure aria-hidden="true">
                <div className={styles['graph']}>
                    <span className={styles['graphRowLabel']}>25</span>
                    <span className={styles['graphRowLabel']}>20</span>
                    <span className={styles['graphRowLabel']}>15</span>
                    <span className={styles['graphRowLabel']}>10</span>
                    <span className={styles['graphRowLabel']}>0</span>
                    <div className={styles['graphBar']} style={graphStyle1}></div>
                    <div className={styles['graphBar']} style={graphStyle2}></div>
                    <div className={styles['graphBar']} style={graphStyle3}></div>
                    <div className={styles['graphBar']} style={graphStyle4}></div>
                    <div className={styles['graphBar']} style={graphStyle5}></div>
                    <span className={styles['graphColumnLabel']}></span>
                    <span className={styles['graphColumnLabel']}></span>
                    <span className={styles['graphColumnLabel']}>{lastFiveGames[0]}/25</span>
                    <span className={styles['graphColumnLabel']}>{lastFiveGames[1]}/25</span>
                    <span className={styles['graphColumnLabel']}>{lastFiveGames[2]}/25</span>
                    <span className={styles['graphColumnLabel']}>{lastFiveGames[3]}/25</span>
                    <span className={styles['graphColumnLabel']}>{lastFiveGames[4]}/25</span>
                </div>
            </figure>
        </>
    );
}

function getPercentage(value) {
    const percentage = (Number(value) * 100) / 25;

    return `${percentage}%`
}

export default memo(Graph);