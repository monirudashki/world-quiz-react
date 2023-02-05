import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import image from '../../../Assets/images/logo-1.jpg';
import { AuthContext } from '../../../Contexts/AuthContext';
import { baseUrl } from '../../../Services/request';
import styles from '../Header/Header.module.css';

function Header() {

    const navigateTo = useNavigate();
    //navigate on page correct works?
    const { currentUser, currentUserLoginHandler } = useContext(AuthContext);

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
            currentUserLoginHandler(null);
            navigateTo('/');
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

                {currentUser?.roles === 'admin' &&
                    <>
                        <NavLink to={'/admin/capitals-questions?page=1'} className={setActiveStyle}>Capitols</NavLink>
                        <NavLink to={'/admin/flags-questions'} className={setActiveStyle}>Flags</NavLink>
                        <NavLink to={'/admin/add-capitals-question'} className={setActiveStyle}>Add Capitals</NavLink>
                        <NavLink to={'/admin/add-flags-question'} className={setActiveStyle}>Add Flags</NavLink>
                        <button className={styles['logout-button']} onClick={logoutHandler}>Logout</button>
                    </>
                }
                {currentUser?.roles === 'user' &&
                    <>
                        <NavLink to={'/rules'} className={setActiveStyle}>Rules</NavLink>
                        <NavLink to={'/scoreboard'} className={setActiveStyle}>Scoreboard</NavLink>
                        <NavLink to={'/auth/user-profile/rudashki'} className={setActiveStyle}>{currentUser?.username}</NavLink>
                        <button className={styles['logout-button']} onClick={logoutHandler}>Logout</button>
                    </>
                }
            </nav>
        </header>
    )
}

export default Header;