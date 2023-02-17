import styles from '../UserProfile/UserProfile.module.css';

export const UserProfileInfo = ({
    username,
    email,
    lives,
    onEditClickHandler,
    onEarnLivesHandler
}) => {
    return (
        <>
            <p>Username: <span>{username}</span></p>
            <p>Email: <span>{email}</span></p>

            <div className={styles['work-buttons']}>
                <button type="button" onClick={() => onEditClickHandler(true)}>EDIT</button>
                <button disabled={lives > 4} type="button" onClick={() => onEarnLivesHandler(true)}>LIVE+</button>
            </div>
        </>
    );
}