import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";
import { baseUrl } from "../../../Services/request";

export const Logout = () => {

    const navigateTo = useNavigate();
    const { currentUserLoginHandler } = useContext(AuthContext);

    useEffect(() => {
        console.log('try to logout')
        fetch(`${baseUrl}/logout`, {
            method: "POST",
            headers: { 'Content-type': 'Application/json' },
            credentials: 'include',
            mode: 'no-cors',
            body: {}
        })
            .then(() => {
                currentUserLoginHandler(null);
                navigateTo('/');
            })
    }, [currentUserLoginHandler, navigateTo])

    return null;
}