import { memo } from 'react';
import styles from '../UserProfile/UserProfile.module.css';

const UserProfileInfo = ({
    username,
    email,
    lives,
    onEditClickHandler,
    onEarnLivesHandler
}) => {
    return (
        <>
            <p>Username: <span data-testid='info-username'>{username}</span></p>
            <p>Email: <span data-testid='info-email'>{email}</span></p>

            <div className={styles['work-buttons']}>
                <button type="button" onClick={() => onEditClickHandler(true)} data-testid='info-button-edit'>EDIT</button>
                <button disabled={lives > 4} type="button" onClick={() => onEarnLivesHandler(true)} data-testid='info-button-lives'>LIVE+</button>
            </div>
        </>
    );
}

export default memo(UserProfileInfo);