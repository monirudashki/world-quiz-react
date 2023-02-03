import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import image from '../../../Assets/images/logo-1.jpg';
import { baseUrl } from '../../../Services/request';
import styles from '../Header/Header.module.css';

function Header() {

    //navigate on page correct works?

    const [currentUser, setCurrentUser] = useState('user');

    const setActiveStyle = ({ isActive }) => {
        return isActive
            ? styles['active']
            : 'none'
    }

    const logoutHandler = async () => {
        try {
            await fetch(`${baseUrl}/logout`, {
                method: "POST",
                headers: { 'Content-type': 'Application/json' },
                credentials: 'include',
                mode: 'no-cors',
                body: {}
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className={styles['header']}>
            <NavLink className={styles["logo"]} to="/"><img className={styles["logo-img"]} src={image} alt="" /></NavLink>
            <nav className={styles['nav']}>

                {!currentUser &&
                    <>
                        <NavLink to="/auth/login" className={setActiveStyle}>Login</NavLink>
                        <NavLink to="/auth/register" className={setActiveStyle}>Register</NavLink>
                    </>
                }

                {currentUser === 'admin' &&
                    <>
                        <NavLink to={'/admin/capitals-questions'} className={setActiveStyle}>Capitols</NavLink>
                        <NavLink to={'/admin/flags-questions'} className={setActiveStyle}>Flags</NavLink>
                        <NavLink to={'/admin/add-capitals-question'} className={setActiveStyle}>Add Capitals</NavLink>
                        <NavLink to={'/admin/add-flags-question'} className={setActiveStyle}>Add Flags</NavLink>
                        <a onClick={logoutHandler}>Logout</a>
                    </>
                }
                {currentUser === 'user' &&
                    <>
                        <Link to={'/rules'} className={setActiveStyle}>Rules</Link>
                        <Link to={'/scoreboard'} className={setActiveStyle}>Scoreboard</Link>
                        <Link to={'/auth/user-profile/rudashki'} className={setActiveStyle}>Rudashki</Link>
                        <a onClick={logoutHandler}>Logout</a>
                    </>
                }
            </nav>
        </header>
    )
}

export default Header;