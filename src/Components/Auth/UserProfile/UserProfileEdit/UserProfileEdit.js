import { useState } from 'react';
import { editCurrentUser } from '../../../../Services/authService';
import { emailValidator, imageUrlValidator, minLength } from '../../../../Utils/validators';
import styles from '../UserProfileEdit/UserProfileEdit.module.css';

export const UserProfileEdit = ({
    user,
    onEditClickHandler,
    currentUserLoginHandler
}) => {

    const [error, setError] = useState('');

    const [errors, setErrors] = useState({});

    const [formValues, setFormValues] = useState({
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl,
    });

    const onChangeValueHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value.trim()
        }))
    }

    const invalidForm = Object.values(formValues).some(x => x === '') || Object.values(errors).some(x => x)

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        console.log('edit profile');

        const userData = { ...formValues };

        try {
            const user = await editCurrentUser(userData);
            if (user) {
                currentUserLoginHandler(user);
                onEditClickHandler(false);
            }
        } catch (err) {
            setError(err)
        }
    }

    return (
        <>
            {error &&
                <div className={styles["error-edit"]}>
                    {error}
                </div>
            }

            <form className={styles['form-edit']} onSubmit={onSubmitHandler}>
                <label htmlFor="register-username">Username: </label>
                <input type="text" name="username" id="register-username" placeholder="username"
                    value={formValues.username} onChange={onChangeValueHandler} onBlur={(e) => minLength(e, 3, setErrors, formValues)}
                />

                {errors.username &&
                    <span className={styles['error-edit']}>Username must be at least 3 characters long!</span>
                }

                <label htmlFor="register-email">Email: </label>
                <input type="text" name="email" id="register-email" placeholder="email"
                    value={formValues.email} onChange={onChangeValueHandler} onBlur={(e) => emailValidator(e, setErrors, formValues)}
                />

                {errors.email &&
                    <span className={styles['error-edit']}>Email must be valid!</span>
                }

                <label htmlFor="register-imageUrl">ImageUrl: </label>
                <input type="text" name="imageUrl" id="register-imageUrl" placeholder="image Url"
                    value={formValues.imageUrl} onChange={onChangeValueHandler} onBlur={(e) => imageUrlValidator(e, setErrors, formValues)}
                />

                {errors.imageUrl &&
                    <span className={styles['error-edit']}>ImageUrl must be a valid link!</span>
                }

                <div className={styles['action-buttons']}>
                    <button type='button' onClick={() => onEditClickHandler(false)}>CANCEL</button>
                    <button
                        className={invalidForm ? styles['button-disabled'] : styles['button']}
                        disabled={invalidForm}
                        type="submit"
                    >
                        EDIT
                    </button>
                </div>
            </form>
        </>
    )
}