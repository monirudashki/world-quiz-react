import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext';

export const GuestGuardOnly = () => {

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}