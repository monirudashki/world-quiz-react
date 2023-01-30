import { Fragment } from 'react';
import styles from '../ScoreBoard/ScoreBoard.module.css';
import { ScoreBoardItem } from './ScoreBoardItem/ScoreBoardItem';

const users = [
    {
        '_id': 'sdadsad',
        'username': "MoniRudashki",
        'coins': 25000,
        'place': 1
    },
    {
        '_id': 'sdaddssad',
        'username': "Kiril",
        'coins': 12000,
        'place': 2
    },
    {
        '_id': 'sdwwadsad',
        'username': "Pesho",
        'coins': 8000,
        'place': 3
    },
    {
        '_id': 'sdadsadddd',
        'username': "Ivan",
        'coins': 7000,
        'place': 4
    },
    {
        '_id': 'sdadsad22',
        'username': "Moni",
        'coins': 3000,
        'place': 5
    }
]

export const ScoreBoard = () => {
    return (
        <>
            <div className={styles["head"]}>
                <h1>Scoreboard</h1>
            </div>

            <section className={styles['scoreboard-container']}>

                {users.map(user => <ScoreBoardItem key={user._id} user={user} />)}

                <div className={styles['pagination']}>
                    <button>Left</button>
                    <p>1/2</p>
                    <button>Right</button>
                </div>
            </section>
        </>
    );
}