import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";
import { logout } from "../../../Services/authService";
// import { baseUrl } from "../../../Services/request";

export const Logout = () => {

    const navigateTo = useNavigate();
    const { currentUserLoginHandler, currentUser } = useContext(AuthContext);

    useEffect(() => {

        if (!currentUser) {
            navigateTo('/')
        }

        logout()
            .then(() => {
                currentUserLoginHandler(null);
                navigateTo('/');
            })
    }, [currentUserLoginHandler, navigateTo, currentUser])

    return null;
}