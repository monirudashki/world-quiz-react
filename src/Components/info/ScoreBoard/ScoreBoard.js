import styles from '../ScoreBoard/ScoreBoard.module.css';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ScoreBoardItem } from './ScoreBoardItem/ScoreBoardItem';
import { Spinner } from '../../shared/Spinner.js/Spinner';

export const ScoreBoard = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([]);

    const [lastPage, setLastPage] = useState(0);

    let currentPage = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        setIsLoading(true);

        fetch(`http://localhost:3030/api/users?page=${currentPage}`)
            .then(res => res.json())
            .then(result => {
                setLastPage(Math.ceil(result.count / 5));
                setUsers(result.users);
                setIsLoading(false);
            })
    }, [currentPage]);

    const pageUpHandler = () => {
        setSearchParams(values => ({
            ...values,
            page: currentPage + 1
        }));
    }

    const pageDownHandler = () => {
        setSearchParams(values => ({
            ...values,
            page: currentPage - 1
        }));
    }

    return (
        <>
            <div className={styles["head"]}>
                <h1>Scoreboard</h1>
            </div>

            <section className={styles['scoreboard-container']}>

                {isLoading
                    ?
                    <Spinner />
                    :
                    <>
                        {users.map((user, index) => <ScoreBoardItem key={user._id} user={user} index={index} page={currentPage} />)}
                    </>
                }

                <div className={styles['pagination']}>
                    <button type='button' onClick={pageDownHandler} disabled={currentPage === 1}>Previous</button>
                    <p>{currentPage}/2</p>
                    <button type="button" onClick={pageUpHandler} disabled={currentPage === lastPage}>Next</button>
                </div>
            </section>
        </>
    );
}