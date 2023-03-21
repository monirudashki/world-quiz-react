import styles from '../Login/Login.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { emailValidator, minLength } from '../../../Utils/validators';
import { login } from '../../../Services/authService';
import { AuthContext } from '../../../Contexts/AuthContext';
import { SpinnerRequest } from '../../shared/SpinnerRequest/SpinnerRequest';

export const Login = () => {

    const { currentUserLoginHandler } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

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
        }));
    }

    const invalidForm = Object.values(formValues).some(x => x === '') || Object.values(errors).some(x => x)

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const userData = {
            email: formValues.email.trim().toLocaleLowerCase(),
            password: formValues.password.trim()
        }

        try {
            const user = await login(userData);
            currentUserLoginHandler(user);
            setIsLoading(false);
            navigateTo('/');
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    }

    return (
        <main>
            <section id="login">
                <div className={styles["form"]}>
                    <h2>Login</h2>

                    {error &&
                        <div data-testid='login-error' className={styles["error"]}>
                            {error}
                        </div>
                    }

                    <form className={styles["login-form"]} onSubmit={onSubmitHandler}>

                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" id="email" data-testid='login-email'
                            value={formValues.email}
                            onChange={onChangeValueHandler}
                            onBlur={(e) => emailValidator(e, setErrors, formValues)}
                        />

                        {errors.email &&
                            <p data-testid='login-error-email' className={styles['error']}>Email must be valid!</p>
                        }

                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" data-testid='login-password'
                            value={formValues.password}
                            onChange={onChangeValueHandler}
                            onBlur={(e) => minLength(e, 5, setErrors, formValues)}
                        />

                        {errors.password &&
                            <p data-testid='login-error-password' className={styles['error']}>Password must be at least 5 characters long!</p>
                        }

                        <button
                            type="submit"
                            className={invalidForm ? styles['button-disabled'] : styles['button']}
                            disabled={invalidForm || isLoading}
                        >
                            {isLoading ? <SpinnerRequest /> : 'LOGIN'}
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