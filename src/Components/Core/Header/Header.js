import { useState } from 'react';
import image from '../../../Assets/images/logo-1.jpg';
import styles from '../Header/Header.module.css';

function Header() {

    //TODO optimization of active buttons?

    const [currentUser, setCurrentUser] = useState(null);

    const [activePage, setActivePage] = useState('');

    const activeCapitals = () => {
        setActivePage(oldPage => 'capitals');
    }
    const activeFlags = () => {
        setActivePage(oldPage => 'flags');
    }
    const activeAddCapitals = () => {
        setActivePage(oldPage => 'addCapitals');
    }
    const activeAddFlags = () => {
        setActivePage(oldPage => 'addFlags');
    }

    const activeLogin = () => {
        setActivePage(oldPage => 'login');
        setCurrentUser(user => 'user');
    }

    const activeRegister = () => {
        setActivePage(oldPage => 'register');
        setCurrentUser(user => 'admin');
    }

    const activeRules = () => {
        setActivePage(oldPage => 'rules');
    }

    const activeScoreBoard = () => {
        setActivePage(oldPage => 'scoreBoard');
    }

    const activeProfile = () => {
        setActivePage(oldPage => 'profile');
    }

    const logoutHandler = () => {
        setCurrentUser(user => null);
        setActivePage(oldPage => '');
    }

    return (
        <header className={styles['header']}>
            <a className={styles["logo"]} href="#/"><img className={styles["logo-img"]} src={image} alt="" /></a>
            <nav className={styles['nav']}>

                {currentUser == null &&
                    <div>
                        <a onClick={activeLogin} className={activePage == 'login' ? styles['active'] : 'none'}>Login</a>
                        <a onClick={activeRegister} className={activePage == 'register' ? styles['active'] : 'none'}>Register</a>
                    </div>
                }

                {currentUser === 'admin' &&
                    <div>
                        <a onClick={activeCapitals} className={activePage == 'capitals' ? styles['active'] : 'none'}>Capitols</a>
                        <a onClick={activeFlags} className={activePage == 'flags' ? styles['active'] : 'none'}>Flags</a>
                        <a onClick={activeAddCapitals} className={activePage == 'addCapitals' ? styles['active'] : 'none'}>Add Capitals</a>
                        <a onClick={activeAddFlags} className={activePage == 'addFlags' ? styles['active'] : 'none'}>Add Flags</a>
                        <a onClick={logoutHandler}>Logout</a>
                    </div>
                }
                {currentUser == 'user' &&
                    <div>
                        <a onClick={activeRules} className={activePage == 'rules' ? styles['active'] : 'none'}>Rules</a>
                        <a onClick={activeScoreBoard} className={activePage == 'scoreBoard' ? styles['active'] : 'none'}>Scoreboard</a>
                        <a onClick={activeProfile} className={activePage == 'profile' ? styles['active'] : 'none'}>Rudashki</a>
                        <a onClick={logoutHandler}>Logout</a>
                    </div>
                }
            </nav>
        </header>
    )
}

export default Header;