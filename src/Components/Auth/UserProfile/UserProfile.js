import styles from '../UserProfile/UserProfile.module.css';

const user = {
    'username': 'MoniRudashki',
    'email': 'monirudashki@abv.bg'
}

const userLevel = 3;

//Add diagram model;

export const UserProfile = () => {
    return (
        <>
            <div className={styles['head']}>
                <h1>User Profile</h1>
            </div>

            <section className={styles["profile-container"]}>
                <div className={styles["profile-container__img"]}>
                    <img src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-For-Youtube-960x1024.jpg" alt="" />
                </div>

                <div className={styles['profile-container__info']}>
                    <p>Username: <span>{user.username}</span></p>
                    <p>Email: <span>{user.email}</span></p>

                    <div className={styles['work-buttons']}>
                        <button type="button">EDIT</button>
                        <button type="button">CHANGE PASSWORD</button>
                        <button type="button">EARN COINS</button>
                    </div>
                </div>

                <div className={styles['profile-container__level']}>
                    <h2>LEVEL</h2>
                    <div className={styles['level-square']}>
                        <p>{userLevel}</p>
                    </div>
                </div>

                {/* diagrama on own component */}

                <div className={styles['profile-container__diagrama']}>
                    <h2>Last 5 games score graph</h2>
                    <figure aria-hidden="true">
                        <div className={styles['graph']}>
                            <span className={styles['graphRowLabel']}>25</span>
                            <span className={styles['graphRowLabel']}>20</span>
                            <span className={styles['graphRowLabel']}>15</span>
                            <span className={styles['graphRowLabel']}>10</span>
                            <span className={styles['graphRowLabel']}>0</span>
                            <div className={styles['graphBar']}></div>
                            <div className={styles['graphBar']}></div>
                            <div className={styles['graphBar']}></div>
                            <div className={styles['graphBar']}></div>
                            <div className={styles['graphBar']}></div>
                        </div>
                    </figure>
                </div>
            </section>
        </>
    );
}