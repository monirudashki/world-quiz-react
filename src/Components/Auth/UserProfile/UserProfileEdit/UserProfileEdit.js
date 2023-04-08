import { useState } from 'react';
import { editCurrentUser } from '../../../../Services/authService';
import { emailValidator, minLength } from '../../../../Utils/validators';
import { SpinnerRequest } from '../../../shared/SpinnerRequest/SpinnerRequest'
import styles from '../UserProfileEdit/UserProfileEdit.module.css';
import axios from 'axios';

export const UserProfileEdit = ({
    user,
    onEditClickHandler,
    currentUserLoginHandler,
    onSetEditModeImage,
    editModeImage,
    onImageLoading
}) => {

    const [error, setError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const [formValues, setFormValues] = useState({
        username: user.username,
        email: user.email,
    });

    const onChangeValueHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const handleFileChange = (e) => {
        e.preventDefault();

        onImageLoading(true);

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:3030/api/users/profile/fileUpload', formData)
            .then(result => {
                onSetEditModeImage(`https://drive.google.com/uc?export=view&id=${result.data.id}`);
            })
            .catch(err => console.log(err))
            .finally(() => onImageLoading(false));
    }

    const invalidForm = Object.values(formValues).some(x => x === '') || Object.values(errors).some(x => x)

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const userData = {
            username: formValues.username,
            email: formValues.email,
            imageUrl: editModeImage
        };

        try {
            const user = await editCurrentUser(userData);
            if (user) {
                setIsLoading(false);
                currentUserLoginHandler(user);
                onEditClickHandler(false);
            }
        } catch (err) {
            setIsLoading(false);
            setError(err);
        }
    }

    const handleCancelClick = () => {
        onSetEditModeImage(user.imageUrl);
        onEditClickHandler(false);
    }

    return (
        <>
            {error &&
                <div data-testid='editProfile-error' className={styles["error-request"]}>
                    {error}
                </div>
            }

            <form data-testid='editProfile-form' className={styles['form-edit']} onSubmit={onSubmitHandler}>
                <label htmlFor="register-username">Username: </label>
                <input type="text" name="username" id="register-username" placeholder="username"
                    value={formValues.username} onChange={onChangeValueHandler} onBlur={(e) => minLength(e, 3, setErrors, formValues)}
                />

                {errors.username &&
                    <span data-testid='editProfile-username-error' className={styles['error-edit']}>Username must be at least 3 characters long!</span>
                }

                <label htmlFor="register-email">Email: </label>
                <input type="text" name="email" id="register-email" placeholder="email"
                    value={formValues.email} onChange={onChangeValueHandler} onBlur={(e) => emailValidator(e, setErrors, formValues)}
                />

                {errors.email &&
                    <span data-testid='editProfile-email-error' className={styles['error-edit']}>Email must be valid!</span>
                }

                <input className={styles['input-image']} type="file" name='photo' accept='image/*' onChange={handleFileChange} />

                <div className={styles['action-buttons']}>
                    <button type='button' onClick={handleCancelClick}>CANCEL</button>
                    <button
                        className={invalidForm ? styles['button-disabled'] : styles['button']}
                        disabled={invalidForm || isLoading}
                        type="submit"
                        data-testid='profileEdit-button'
                    >
                        {isLoading ? <SpinnerRequest /> : "EDIT"}
                    </button>
                </div>
            </form>
        </>
    )
}