import styles from '../UserProfile/UserProfile.module.css';

export const UserProfileInfo = ({
    username,
    email,
    onEditClickHandler
}) => {
    return (
        <>
            <p>Username: <span>{username}</span></p>
            <p>Email: <span>{email}</span></p>

            <div className={styles['work-buttons']}>
                <button type="button" onClick={() => onEditClickHandler(true)}>EDIT</button>
                <button type="button">EARN COINS</button>
            </div>
        </>
    );
}