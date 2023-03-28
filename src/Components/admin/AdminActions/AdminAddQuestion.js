import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCapitalsQuestion } from '../../../Services/capitalsService';

import { firstCapitalLetter, wrightAnswerExist } from '../../../Utils/validators';
import { SpinnerRequest } from '../../shared/SpinnerRequest/SpinnerRequest';

import styles from '../AdminActions/AdminActions.module.css';

function AdminAddQuestion() {

    const navigateTo = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [requestError, setRequestError] = useState('');
    const [success, setSuccess] = useState(false);

    const [errors, setErrors] = useState({});

    const [formValues, setFormValues] = useState({
        title: '',
        firstAnswer: '',
        secondAnswer: '',
        thirdAnswer: '',
        fourthAnswer: '',
        wrightAnswer: '',
    });

    const onChangeValueHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const invalidForm = Object.values(formValues).some(x => x === '') || Object.values(errors).some(x => x);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const questionData = { ...formValues };

        try {
            await createCapitalsQuestion(questionData);

            setRequestError('');
            setSuccess(true);
            setIsLoading(false);
            setTimeout(() => {
                setSuccess(false);
            }, 2000);

            setFormValues(state => ({
                title: '',
                firstAnswer: '',
                secondAnswer: '',
                thirdAnswer: '',
                fourthAnswer: '',
                wrightAnswer: '',
            }));
        } catch (err) {
            setRequestError(err);
            setIsLoading(false);
        }
    }

    return (
        <div className={styles['form']}>
            <p data-testid='requestError' className={styles['error']}>{requestError}</p>

            {success &&
                <p data-testid='success' className={styles['success']}>Success!</p>
            }

            <h2>Add Capitals Question</h2>

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
                        {isLoading ? <SpinnerRequest /> : "CREATE"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminAddQuestion