import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext';

export const UsersOnlyGuard = () => {

    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        console.log('return from if')
        return <Navigate to="/auth/login" replace />
    }

    if (currentUser.roles === 'admin') {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}