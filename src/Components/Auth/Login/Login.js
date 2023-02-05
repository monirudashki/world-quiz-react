import styles from '../Login/Login.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { emailValidator, minLength } from '../../../Utils/validators';
import { login } from '../../../Services/authService';
import { AuthContext } from '../../../Contexts/AuthContext';

export const Login = () => {

    const { currentUserLoginHandler } = useContext(AuthContext);

    const navigateTo = useNavigate();

    const [error, setError] = useState('');

    const [errors, setErrors] = useState({});

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const onChangeValueHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const invalidForm = Object.values(formValues).some(x => x === '') || Object.values(errors).some(x => x)

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        console.log('submit')

        const userData = { ...formValues };

        try {
            const user = await login(userData);
            currentUserLoginHandler(user);
            navigateTo('/')
        } catch (err) {
            setError(err)
        }
    }

    return (
        <main>
            <section id="login">
                <div className={styles["form"]}>
                    <h2>Login</h2>

                    {error &&
                        <div className={styles["error"]}>
                            {error}
                        </div>
                    }

                    <form className={styles["login-form"]} onSubmit={onSubmitHandler}>

                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" id="email"
                            value={formValues.email} onChange={onChangeValueHandler} onBlur={(e) => emailValidator(e, setErrors, formValues)}
                        />

                        {errors.email &&
                            <p className={styles['error']}>Email must be valid!</p>
                        }

                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password"
                            value={formValues.password} onChange={onChangeValueHandler} onBlur={(e) => minLength(e, 5, setErrors, formValues)}
                        />

                        {errors.password &&
                            <p className={styles['error']}>Password must be at least 5 characters long!</p>
                        }

                        <button
                            type="submit"
                            className={invalidForm ? styles['button-disabled'] : styles['button']}
                            disabled={invalidForm}
                        >
                            LOGIN
                        </button>
                        <p className={styles["message"]}>
                            Not registered? <Link to="/auth/login">Register</Link>
                        </p>
                    </form>
                </div>
            </section>
        </main>
    );
}