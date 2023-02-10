import styles from '../UserProfile/UserProfile.module.css';
import { useContext, useState } from 'react';

import { AuthContext } from '../../../Contexts/AuthContext';

import { Graph } from './Graph';
import { UserProfileInfo } from './UserProfileInfo';
import { UserProfileEdit } from './UserProfileEdit/UserProfileEdit';

export const UserProfile = () => {

    const { currentUser, currentUserLoginHandler } = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);

    const onEditClickHandler = (boolean) => {
        setEditMode(boolean);
    }

    return (
        <>
            <div className={styles['head']}>
                <h1>{currentUser.username} Profile</h1>
            </div>

            <section className={styles["profile-container"]}>
                <div className={styles["profile-container__img"]}>
                    <img src={currentUser.imageUrl} alt="" />
                </div>

                <div className={styles['profile-container__info']}>
                    {!editMode
                        ?
                        <UserProfileInfo username={currentUser.username} email={currentUser.email} onEditClickHandler={onEditClickHandler} />
                        :
                        <UserProfileEdit user={currentUser} onEditClickHandler={onEditClickHandler} currentUserLoginHandler={currentUserLoginHandler} />
                    }
                </div>

                <div className={styles['profile-container__level']}>
                    <h2>LEVEL</h2>
                    <div className={styles['level-square']}>
                        <p>{currentUser.level}</p>
                    </div>
                </div>

                <div className={styles['profile-container__diagrama']}>
                    <Graph lastFiveGames={currentUser.lastFiveGames} />
                </div>
            </section>
        </>
    );
}