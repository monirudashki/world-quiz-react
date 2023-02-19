import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext';

export const UsersOnlyGuard = () => {

    const { currentUser } = useContext(AuthContext);

    console.log(currentUser);

    if (!currentUser) {
        return <Navigate to="/auth/login" replace />
    }

    if (currentUser && currentUser.roles === 'admin') {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}