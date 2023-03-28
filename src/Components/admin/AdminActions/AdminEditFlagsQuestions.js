import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFlagsQuestionById } from '../../../Services/flagsService';

import { firstCapitalLetter, wrightAnswerExist } from '../../../Utils/validators';
import { Spinner } from '../../shared/Spinner.js/Spinner';
import { SpinnerRequest } from '../../shared/SpinnerRequest/SpinnerRequest';

import styles from '../AdminActions/AdminActions.module.css';

function AdminEditFlagsQuestion() {

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [requestIsLoading, setRequestIsLoading] = useState(false);

    useEffect(() => {
        getFlagsQuestionById(id)
            .then(result => {
                setFormValues(state => ({
                    title: result.title,
                    firstAnswer: result.firstAnswer,
                    secondAnswer: result.secondAnswer,
                    thirdAnswer: result.thirdAnswer,
                    fourthAnswer: result.fourthAnswer,
                    wrightAnswer: result.wrightAnswer
                }))
                setIsLoading(false);
            })
    }, [id]);

    const navigateTo = useNavigate();

    const [requestError, setRequestError] = useState('');

    const [errors, setErrors] = useState({});

    const [formValues, setFormValues] = useState({});

    const onChangeValueHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const invalidForm = Object.values(formValues).some(x => x === '') || Object.values(errors).some(x => x);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const questionData = { ...formValues };

        setRequestIsLoading(true);

        //TODO All admin action with rest api to service..
        try {
            const response = await fetch(`http://localhost:3030/api/flags/${id}/edit`, {
                method: "PUT",
                headers: {
                    "Content-type": 'Application/json'
                },
                credentials: 'include',
                body: JSON.stringify(questionData)
            });

            const result = await response.json();

            setRequestIsLoading(false);
            setRequestError('');
            navigateTo(`/admin/flags-questions?page=1&search=${result.title}`);
        } catch (err) {
            setRequestIsLoading(false);
            setRequestError(err);
        }
    }

    return (
        <>
            {isLoading === true
                ?
                <Spinner />
                :
                <div className={styles['form']}>
                    <p data-testid='requestError' className={styles['error']}>{requestError}</p>

                    <h2>Edit Flags Question</h2>

                    <form className={styles['create-form']} onSubmit={onSubmitHandler}>

                        <div>
                            <label htmlFor="title">*Title: </label>
                            <input type="text" name="title" id="Title" data-testid='title'
                                value={formValues.title} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                            {errors.title &&
                                <p className={styles['error']}>Title is required and needs to starts with capital letter!</p>
                            }
                        </div>

                        <div>
                            <label htmlFor="firstAnswer">*First answer:</label>
                            <input type="text" name="firstAnswer" id="firstAnswer" data-testid='firstAnswer'
                                value={formValues.firstAnswer} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                            {errors.firstAnswer &&
                                <p className={styles['error']}>First Answer is required and needs to starts with capital letter!</p>
                            }
                        </div>

                        <div>
                            <label htmlFor="secondAnswer">*Second Answer: </label>
                            <input type="text" name="secondAnswer" id="secondAnswer" data-testid='secondAnswer'
                                value={formValues.secondAnswer} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                            {errors.secondAnswer &&
                                <p className={styles['error']}>Second Answer is required and needs to starts with capital letter!</p>
                            }
                        </div>

                        <div>
                            <label htmlFor="thirdAnswer">*Third Answer: </label>
                            <input type="text" name="thirdAnswer" id="thirdAnswer" data-testid='thirdAnswer'
                                value={formValues.thirdAnswer} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                            {errors.thirdAnswer &&
                                <p className={styles['error']}>Third Answer is required and needs to starts with capital letter!</p>
                            }
                        </div>

                        <div>
                            <label htmlFor="fourthAnswer">*Forth Answer: </label>
                            <input type="text" name="fourthAnswer" id="forthAnswer" data-testid='fourthAnswer'
                                value={formValues.fourthAnswer} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                            {errors.fourthAnswer &&
                                <p className={styles['error']}>Forth Answer is required and needs to starts with capital letter!</p>
                            }
                        </div>

                        <div>
                            <label htmlFor="wrightAnswer">*Wright Answer: </label>
                            <input type="text" name="wrightAnswer" id="wrightAnswer" data-testid='wrightAnswer'
                                value={formValues.wrightAnswer} onChange={onChangeValueHandler} onBlur={(e) => wrightAnswerExist(e, setErrors, formValues)} />

                            {errors.wrightAnswer &&
                                <p className={styles['error']}>Wright Answer must exist in other for answers!</p>
                            }
                        </div>

                        <div className={styles['buttons']}>
                            <button className={styles['button']} type="button" onClick={() => navigateTo('/')}>CANCEL</button>
                            <button
                                type="submit"
                                className={invalidForm ? styles['button-disabled'] : styles['button']}
                                disabled={invalidForm}
                            >
                                {requestIsLoading ? <SpinnerRequest /> : 'EDIT'}
                            </button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}

export default AdminEditFlagsQuestion;