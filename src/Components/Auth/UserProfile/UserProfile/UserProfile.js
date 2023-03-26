import styles from '../UserProfile/UserProfile.module.css';

import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';
import Graph from './Graph';
import UserProfileInfo from './UserProfileInfo';
import { UserProfileEdit } from '../UserProfileEdit/UserProfileEdit';
import { Commercial } from '../Commercial/Commercial';
import CoinsLives from '../../../shared/CoinsLives/Coins&Lives';
import { Spinner } from '../../../shared/Spinner.js/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

export const UserProfile = () => {

    const navigateTo = useNavigate();

    const { currentUser, currentUserLoginHandler } = useContext(AuthContext);

    const { username } = useParams();
    useEffect(() => {
        if (username !== currentUser.username) {
            navigateTo('/not-found-page');
        }
    }, [username, currentUser.username, navigateTo])


    const [editMode, setEditMode] = useState(false);

    const [commercialMode, setCommercialMode] = useState(false);

    const onEditClickHandler = useCallback((boolean) => {
        setEditMode(boolean);
    }, []);

    const onEarnLivesHandler = useCallback((boolean) => {
        setCommercialMode(boolean);
    }, []);

    if (!currentUser) {
        return <Spinner />
    }

    return (
        <>
            <div className={styles['head']}>
                <h1>{currentUser.username} Profile</h1>
            </div>

            {commercialMode && <Commercial onEarnLivesHandler={onEarnLivesHandler} currentUserLoginHandler={currentUserLoginHandler} />}

            <CoinsLives
                coins={currentUser.coins}
                lives={currentUser.lives}
            ></CoinsLives>

            <section className={styles["profile-container"]}>
                <div className={styles["profile-container__img"]}>
                    <img data-testid='userProfile-img' src={currentUser.imageUrl} alt="image-profile" />
                </div>

                <div data-testid='userProfile-profileInfo' className={styles['profile-container__info']}>
                    {!editMode
                        ?
                        <UserProfileInfo
                            username={currentUser.username}
                            email={currentUser.email}
                            lives={currentUser.lives}
                            onEditClickHandler={onEditClickHandler}
                            onEarnLivesHandler={onEarnLivesHandler}
                        />
                        :
                        <UserProfileEdit
                            user={currentUser}
                            onEditClickHandler={onEditClickHandler}
                            currentUserLoginHandler={currentUserLoginHandler}
                        />
                    }
                </div>

                <div className={styles['profile-container__level']}>
                    <h2 data-testid='userProfile-level'>LEVEL</h2>
                    <div className={styles['level-square']}>
                        <p data-testid='userProfile-level-text'>{currentUser.level}</p>
                    </div>
                </div>

                <div data-testid='userProfile-graph' className={styles['profile-container__diagrama']}>
                    <Graph lastFiveGames={currentUser.lastFiveGames} />
                </div>
            </section>
        </>
    );
}