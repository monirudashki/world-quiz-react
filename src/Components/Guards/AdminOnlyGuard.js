import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext';

export const AdminOnlyGuard = () => {

    const { currentUser } = useContext(AuthContext);

    console.log(currentUser);

    if (!currentUser || currentUser?.roles !== 'admin') {
        return <Navigate to="/auth/login" replace />
    }

    return <Outlet />
}