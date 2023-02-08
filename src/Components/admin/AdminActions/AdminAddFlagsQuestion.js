import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFlagsQuestion } from '../../../Services/flagsService';

import { firstCapitalLetter, wrightAnswerExist } from '../../../Utils/validators';

import styles from '../AdminActions/AdminActions.module.css';

function AdminAddFlagsQuestion() {

    const navigateTo = useNavigate();

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

        const questionData = { ...formValues };

        try {
            await createFlagsQuestion(questionData);

            console.log('add flags question');

            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 2000)

            setFormValues(state => ({
                title: '',
                firstAnswer: '',
                secondAnswer: '',
                thirdAnswer: '',
                fourthAnswer: '',
                wrightAnswer: '',
            }))
        } catch (err) {
            setRequestError(err)
        }
    }

    return (
        <div className={styles['form']}>
            <p className={styles['error']}>{requestError}</p>

            {success &&
                <p className={styles['success']}>Success!</p>
            }

            <h2>Add Flags Question</h2>

            <form className={styles['create-form']} onSubmit={onSubmitHandler}>
                <label htmlFor="title">*Title: </label>
                <input type="text" name="title" id="Title"
                    value={formValues.title} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                {errors.title &&
                    <p className={styles['error']}>Title is required and needs to starts with capital letter!</p>
                }

                <label htmlFor="firstAnswer">*First answer:</label>
                <input type="text" name="firstAnswer" id="firstAnswer"
                    value={formValues.firstAnswer} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                {errors.firstAnswer &&
                    <p className={styles['error']}>First Answer is required and needs to starts with capital letter!</p>
                }

                <label htmlFor="secondAnswer">*Second Answer: </label>
                <input type="text" name="secondAnswer" id="secondAnswer"
                    value={formValues.secondAnswer} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                {errors.secondAnswer &&
                    <p className={styles['error']}>Second Answer is required and needs to starts with capital letter!</p>
                }

                <label htmlFor="thirdAnswer">*Third Answer: </label>
                <input type="text" name="thirdAnswer" id="thirdAnswer"
                    value={formValues.thirdAnswer} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                {errors.thirdAnswer &&
                    <p className={styles['error']}>Third Answer is required and needs to starts with capital letter!</p>
                }

                <label htmlFor="fourthAnswer">*Forth Answer: </label>
                <input type="text" name="fourthAnswer" id="forthAnswer"
                    value={formValues.fourthAnswer} onChange={onChangeValueHandler} onBlur={(e) => firstCapitalLetter(e, setErrors, formValues)} />

                {errors.fourthAnswer &&
                    <p className={styles['error']}>Forth Answer is required and needs to starts with capital letter!</p>
                }

                <label htmlFor="wrightAnswer">*Wright Answer: </label>
                <input type="text" name="wrightAnswer" id="wrightAnswer"
                    value={formValues.wrightAnswer} onChange={onChangeValueHandler} onBlur={(e) => wrightAnswerExist(e, setErrors, formValues)} />

                {errors.wrightAnswer &&
                    <p className={styles['error']}>Wright Answer must exist in other for answers!</p>
                }

                <div className={styles['buttons']}>
                    <button className={styles['button']} type="button" onClick={() => navigateTo('/')}>CANCEL</button>
                    <button
                        type="submit"
                        className={invalidForm ? styles['button-disabled'] : styles['button']}
                        disabled={invalidForm}
                    >CREATE</button>
                </div>
            </form>
        </div>
    );
}

export default AdminAddFlagsQuestion;

