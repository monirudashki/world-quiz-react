import styles from '../Register/Register.module.css';
import { emailValidator, minLength, passwordsMatch } from '../../../Utils/validators';

import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { register } from '../../../Services/authService';
import { AuthContext } from '../../../Contexts/AuthContext';
import { SpinnerRequest } from '../../shared/SpinnerRequest/SpinnerRequest';

export const Register = () => {

    const { currentUserLoginHandler } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const navigateTo = useNavigate();

    const [image, setImage] = useState(false);

    const [imgSrc, setImgSrc] = useState('');

    const [file, setFile] = useState('');

    const [error, setError] = useState('');

    const [errors, setErrors] = useState({});

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        rePass: '',
    });

    const onChangeValueHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const handleFileChange = (e) => {
        e.preventDefault();

        const file = (e.target.files[0]);
        if (file) {
            setImgSrc(URL.createObjectURL(file));
            setImage(true);
            setFile(file);
        }
    }

    const invalidForm = Object.values(formValues).some(x => x === '') || Object.values(errors).some(x => x) || image === false;

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append('username', formValues.username);
        formData.append('email', formValues.email);
        formData.append('password', formValues.password);
        formData.append('file', file);

        try {
            const response = await register(formData);
            const user = response.data;
            console.log(user);
            currentUserLoginHandler(user);
            setIsLoading(false);
            navigateTo('/')
        } catch (err) {
            setIsLoading(false);
            setError(err);
        }
    }

    return (
        <section id="register">
            <div className={styles['register-wrapper']}>
                <div className={styles['image-upload']}>
                    <div className={styles['image-wrapper']}>
                        {image &&
                            <img src={imgSrc} alt="profile" />
                        }
                    </div>

                    <input style={{ backgroundColor: image ? 'green' : null }}
                        className={styles['image-input']}
                        type="file" name='photo' accept='image/*' onChange={handleFileChange}
                    />

                </div>
                <div className={styles["form"]}>

                    <h2 data-testid='register-h2'>Registration</h2>

                    {error &&
                        <div data-testid='register-error' className={styles["error"]}>
                            {error}
                        </div>
                    }

                    <form className={styles["login-form"]} onSubmit={onSubmitHandler}>

                        <label htmlFor="register-username">Username: </label>
                        <input type="text" name="username" id="register-username" data-testid='register-username'
                            value={formValues.username} onChange={onChangeValueHandler} onBlur={(e) => minLength(e, 3, setErrors, formValues)}
                        />

                        {errors.username &&
                            <p data-testid='register-username-error' className={styles['error']}>Username must be at least 3 characters long!</p>
                        }

                        <label htmlFor="register-email">Email: </label>
                        <input type="text" name="email" id="register-email" data-testid='register-email'
                            value={formValues.email} onChange={onChangeValueHandler} onBlur={(e) => emailValidator(e, setErrors, formValues)}
                        />

                        {errors.email &&
                            <p data-testid='register-email-error' className={styles['error']}>Email must be valid!</p>
                        }

                        <label htmlFor="register-password">Password: </label>
                        <input type="password" name="password" id="register-password" data-testid='register-password'
                            value={formValues.password} onChange={onChangeValueHandler} onBlur={(e) => minLength(e, 5, setErrors, formValues)}
                        />

                        {errors.password &&
                            <p data-testid='register-password-error' className={styles['error']}>Password must be at least 5 characters long!</p>
                        }

                        <label htmlFor="repeat-password">Confirm Password: </label>
                        <input type="password" name="rePass" id="repeat-password" data-testid='register-rePass'
                            value={formValues.rePass} onChange={onChangeValueHandler} onBlur={(e) => passwordsMatch(e, setErrors, formValues)}
                        />

                        {errors.rePass &&
                            <p data-testid='register-rePass-error' className={styles['error']}>Passwords don't match!</p>
                        }

                        <button
                            data-testid='register-button'
                            className={invalidForm ? styles['button-disabled'] : styles['button']}
                            disabled={invalidForm || isLoading}
                            type="submit"
                        >
                            {isLoading ? <SpinnerRequest /> : "REGISTER"}
                        </button>
                        <p className={styles["message"]}>Already registered? <Link to="/auth/login" data-testid='login-link'>Login</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
}