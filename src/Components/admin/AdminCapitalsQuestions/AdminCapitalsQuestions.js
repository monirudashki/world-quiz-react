import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from '../AdminCapitalsQuestions/AdminCapitalsQuestions.module.css';

import { CapitalsQuestionItem } from '../CapitalsQuestionItem/CapitalsQuestionItem';
import { Spinner } from '../../shared/Spinner.js/Spinner';

export const AdminCapitalsQuestions = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);

    const [questions, setQuestions] = useState([]);

    let currentPage = Number(searchParams.get('page')) || 1;
    let search = searchParams.get('search') || '';

    useEffect(() => {
        setIsLoading(true);

        fetch(`http://localhost:3030/api/capitals?page=${currentPage}&search=${search}`)
            .then(res => res.json())
            .then(result => {
                setIsLoading(false);
                setQuestions(result);
            })
    }, [currentPage, search]);

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

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const currentSearch = formData.get('search');

        setSearchParams(values => ({
            ...values,
            search: currentSearch
        }));
    }

    return (
        <>
            <div className={styles["head"]}>
                <h1>Admin Capitals Questions</h1>
            </div>

            <div className={styles["search-container"]}>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="search"></label>
                    <input type="text" name="search" id='search' />
                    <button type='submit'>SEARCH</button>
                </form>
            </div>

            <section className={styles["question-container"]}>
                {isLoading ?
                    <Spinner />
                    :
                    <>
                        {questions.length === 0
                            ?
                            <h1>There is no added questions yet!</h1>
                            :
                            <>
                                {questions.map(x => <CapitalsQuestionItem key={x._id} {...x} />)}
                            </>
                        }
                    </>
                }
            </section>

            <div className={styles["pagination"]}>
                <button onClick={pageDownHandler} disabled={currentPage === 1} className={styles["pagination-button"]}>Previous</button>
                <p>{currentPage}</p>
                <button onClick={pageUpHandler} className={styles["pagination-button"]}>Next</button>
            </div>
        </>
    );
}