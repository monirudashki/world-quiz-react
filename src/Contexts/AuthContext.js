import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../Services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentUser()
            .then(currentUser => setCurrentUser(currentUser))
            .catch(err => console.log(err));
    }, [])

    const currentUserLoginHandler = (userData) => {
        setCurrentUser(userData);
    }

    return (
        <AuthContext.Provider value={{ currentUser, currentUserLoginHandler }}>
            {children}
        </AuthContext.Provider>
    )
}