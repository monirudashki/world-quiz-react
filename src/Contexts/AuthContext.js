import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../Services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then(currentUser => {
                setIsLoading(false);
                setCurrentUser(currentUser);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    const currentUserLoginHandler = (userData) => {
        setCurrentUser(userData);
    }

    if (!isLoading) {
        return (
            <AuthContext.Provider value={{
                currentUser,
                currentUserLoginHandler
            }}>
                {children}
            </AuthContext.Provider>
        )
    }
}