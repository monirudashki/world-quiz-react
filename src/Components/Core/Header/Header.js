import styles from '../Header/Header.module.css';
import { AuthContext } from '../../../Contexts/AuthContext';
import logo from './HeaderImages/world-globe-logo-4.png';

import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboard, faRightFromBracket, faUserPlus, faDoorOpen, faRankingStar } from '@fortawesome/free-solid-svg-icons';

const userIcon = <FontAwesomeIcon icon={faUser} />
const rulesIcon = <FontAwesomeIcon icon={faClipboard} />
const loginIcon = <FontAwesomeIcon icon={faRightFromBracket} />
const registerIcon = <FontAwesomeIcon icon={faUserPlus} />
const logoutIcon = <FontAwesomeIcon icon={faDoorOpen} />
const scoreboardIcon = <FontAwesomeIcon icon={faRankingStar} />

function Header() {

    const { currentUser } = useContext(AuthContext);

    const setActiveStyle = ({ isActive }) => {
        return isActive
            ? styles['active']
            : 'none'
    }

    return (
        <header className={styles['header']}>
            <NavLink data-testid='header-logo' className={styles["logo"]} to="/"><img className={styles["logo-img"]} src={logo} alt="" /></NavLink>
            <nav className={styles['nav']}>

                {!currentUser &&
                    <>
                        <NavLink to={'/rules'} className={setActiveStyle} data-testid='header-rules'>{rulesIcon} Rules</NavLink>
                        <NavLink to="/auth/login" className={setActiveStyle} data-testid='header-login'>{loginIcon} Login</NavLink>
                        <NavLink to="/auth/register" className={setActiveStyle} data-testid='header-register'>{registerIcon} Register</NavLink>
                    </>
                }

                {currentUser?.roles === 'admin' &&
                    <>
                        <NavLink to={'/admin/capitals-questions?page=1'} className={setActiveStyle} data-testid="header-capitals">Capitals</NavLink>
                        <NavLink to={'/admin/flags-questions'} className={setActiveStyle} data-testid='header-flags'>Flags</NavLink>
                        <NavLink to={'/admin/add-capitals-question'} className={setActiveStyle} data-testid='header-capitals-add'>Add Capitals</NavLink>
                        <NavLink to={'/admin/add-flags-question'} className={setActiveStyle} data-testid='header-flags-add'>Add Flags</NavLink>
                        <Link to={'/auth/logout'} className={styles['logout-button']} >{logoutIcon}</Link>
                    </>
                }
                {currentUser?.roles === 'user' &&
                    <>
                        <NavLink to={'/rules'} className={setActiveStyle}>{rulesIcon} Rules</NavLink>
                        <NavLink to={'/scoreboard?page=1'} className={setActiveStyle} data-testid='header-scoreboard' >{scoreboardIcon} Scoreboard</NavLink>
                        <NavLink to={`/auth/user-profile/${currentUser.username}`} className={setActiveStyle} data-testid='header-userProfile'>{userIcon} {currentUser.username}</NavLink>
                        <Link to={'/auth/logout'} className={styles['logout-button']} data-testid='header-logout'>{logoutIcon}</Link>
                    </>
                }
            </nav>
        </header>
    )
}

export default Header;