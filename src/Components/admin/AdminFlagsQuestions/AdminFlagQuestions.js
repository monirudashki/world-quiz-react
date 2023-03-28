import styles from '../AdminFlagsQuestions/AdminFlagsQuestions.module.css';

import { FlagsQuestionItem } from '../FlagsQuestionItem/FlagsQuestionItem';
import { Spinner } from '../../shared/Spinner.js/Spinner';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFlagsQuestions } from '../../../Services/flagsService';

function AdminFlagsQuestions() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [questions, setQuestions] = useState([]);

    let currentPage = Number(searchParams.get('page')) || 1;
    let search = searchParams.get('search') || '';
    let questionsLength = questions.length;

    useEffect(() => {
        setIsLoading(true);

        getFlagsQuestions(currentPage, search)
            .then(result => {
                setIsLoading(false);
                setIsQuestionDeleted(false);
                setQuestions(result);
            })
    }, [currentPage, search, isQuestionDeleted]);

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
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const currentSearch = formData.get('search');

        setSearchParams(values => ({
            ...values,
            search: currentSearch
        }));
    };

    const setIsQuestionDeletedHandler = () => {
        setIsQuestionDeleted(true);
    };

    const setCurrentPageHandler = (currentPage) => {
        setSearchParams(values => ({
            ...values,
            page: currentPage - 1
        }))
    };

    return (
        <>
            <div className={styles['head']}>
                <h1>Admin Flags Questions</h1>
            </div>

            <div className={styles["search-container"]}>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="search"></label>
                    <input type="text" name="search" id='search' data-testid='search' />
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
                                {questions.map(x => <FlagsQuestionItem
                                    key={x._id}
                                    question={x}
                                    setIsQuestionDeletedHandler={setIsQuestionDeletedHandler}
                                    questionsLength={questionsLength}
                                    page={currentPage}
                                    setCurrentPageHandler={setCurrentPageHandler}
                                />)}
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

export default AdminFlagsQuestions;
