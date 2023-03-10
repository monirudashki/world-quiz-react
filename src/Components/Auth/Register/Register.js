import styles from '../Register/Register.module.css';
import { emailValidator, imageUrlValidator, minLength, passwordsMatch } from '../../../Utils/validators';

import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { register } from '../../../Services/authService';
import { AuthContext } from '../../../Contexts/AuthContext';

export const Register = () => {

    const { currentUserLoginHandler } = useContext(AuthContext);

    const navigateTo = useNavigate();

    const [error, setError] = useState('');

    const [errors, setErrors] = useState({});

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        imageUrl: '',
        password: '',
        rePass: ''
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

        const userData = { ...formValues };

        try {
            const user = await register(userData);
            currentUserLoginHandler(user);
            navigateTo('/')
        } catch (err) {
            setError(err)
        }
    }

    return (
        <section id="register">
            <div className={styles["form"]}>
                <h2>Registration</h2>

                {error &&
                    <div className={styles["error"]}>
                        {error}
                    </div>
                }

                <form className={styles["login-form"]} onSubmit={onSubmitHandler}>

                    <label htmlFor="register-username">Username: </label>
                    <input type="text" name="username" id="register-username"
                        value={formValues.username} onChange={onChangeValueHandler} onBlur={(e) => minLength(e, 3, setErrors, formValues)}
                    />

                    {errors.username &&
                        <p className={styles['error']}>Username must be at least 3 characters long!</p>
                    }

                    <label htmlFor="register-email">Email: </label>
                    <input type="text" name="email" id="register-email"
                        value={formValues.email} onChange={onChangeValueHandler} onBlur={(e) => emailValidator(e, setErrors, formValues)}
                    />

                    {errors.email &&
                        <p className={styles['error']}>Email must be valid!</p>
                    }

                    <label htmlFor="register-imageUrl">ImageUrl: </label>
                    <input type="text" name="imageUrl" id="register-imageUrl"
                        value={formValues.imageUrl} onChange={onChangeValueHandler} onBlur={(e) => imageUrlValidator(e, setErrors, formValues)}
                    />

                    {errors.imageUrl &&
                        <p className={styles['error']}>ImageUrl must be a valid link!</p>
                    }


                    <label htmlFor="register-password">Password: </label>
                    <input type="password" name="password" id="register-password"
                        value={formValues.password} onChange={onChangeValueHandler} onBlur={(e) => minLength(e, 5, setErrors, formValues)}
                    />

                    {errors.password &&
                        <p className={styles['error']}>Password must be at least 5 characters long!</p>
                    }

                    <label htmlFor="repeat-password">Confirm Password: </label>
                    <input type="password" name="rePass" id="repeat-password"
                        value={formValues.rePass} onChange={onChangeValueHandler} onBlur={(e) => passwordsMatch(e, setErrors, formValues)}
                    />

                    {errors.rePass &&
                        <p className={styles['error']}>Passwords don't match!</p>
                    }

                    <button
                        className={invalidForm ? styles['button-disabled'] : styles['button']}
                        disabled={invalidForm}
                        type="submit"
                    >
                        Register
                    </button>
                    <p className={styles["message"]}>Already registered? <Link to="/auth/login">Login</Link></p>
                </form>
            </div>
        </section>
    );
}