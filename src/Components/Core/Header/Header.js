import { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../../../Assets/images/logo-1.jpg';
import styles from '../Header/Header.module.css';

function Header() {

    //TODO optimization of active buttons?

    const [currentUser, setCurrentUser] = useState('admin');

    const [activePage, setActivePage] = useState('');

    const activeHome = () => {
        setActivePage(oldPage => '');
    }

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
        // setCurrentUser(user => 'user');
    }

    const activeRegister = () => {
        setActivePage(oldPage => 'register');
        // setCurrentUser(user => 'admin');
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
            <Link onClick={activeHome} className={styles["logo"]} to="/"><img className={styles["logo-img"]} src={image} alt="" /></Link>
            <nav className={styles['nav']}>

                {currentUser === null &&
                    <>
                        <Link to="/auth/login" onClick={activeLogin} className={activePage == 'login' ? styles['active'] : 'none'}>Login</Link>
                        <Link to="/auth/register" onClick={activeRegister} className={activePage == 'register' ? styles['active'] : 'none'}>Register</Link>
                    </>
                }

                {currentUser === 'admin' &&
                    <>
                        <Link to={'/admin/capitals-questions'} onClick={activeCapitals} className={activePage == 'capitals' ? styles['active'] : 'none'}>Capitols</Link>
                        <Link to={'/admin/flags-questions'} onClick={activeFlags} className={activePage == 'flags' ? styles['active'] : 'none'}>Flags</Link>
                        <Link to={'/admin/add-capitals-question'} onClick={activeAddCapitals} className={activePage == 'addCapitals' ? styles['active'] : 'none'}>Add Capitals</Link>
                        <Link to={'/admin/add-flags-question'} onClick={activeAddFlags} className={activePage == 'addFlags' ? styles['active'] : 'none'}>Add Flags</Link>
                        <a onClick={logoutHandler}>Logout</a>
                    </>
                }
                {currentUser === 'user' &&
                    <>
                        <Link to={'/rules'} onClick={activeRules} className={activePage == 'rules' ? styles['active'] : 'none'}>Rules</Link>
                        <Link to={'/scoreboard'} onClick={activeScoreBoard} className={activePage == 'scoreBoard' ? styles['active'] : 'none'}>Scoreboard</Link>
                        <Link to={'/auth/user-profile/rudashki'} onClick={activeProfile} className={activePage == 'profile' ? styles['active'] : 'none'}>Rudashki</Link>
                        <a onClick={logoutHandler}>Logout</a>
                    </>
                }
            </nav>
        </header>
    )
}

export default Header;