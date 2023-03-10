import { baseUrl, request } from "./request"

export const login = async (userData) => {
    return await request(`${baseUrl}/login`, "POST", userData);
}

export const logout = () => {
    return fetch(`${baseUrl}/logout`, {
        method: "POST",
        headers: { 'Content-type': 'Application/json' },
        credentials: 'include',
        mode: 'no-cors',
        body: {}
    });
}

export const register = async (userData) => {
    return await request(`${baseUrl}/register`, "POST", userData)
}

export const getCurrentUser = async () => {
    return await request(`${baseUrl}/users/profile`, "GET");
}

export const editCurrentUser = async (userData) => {
    return await request(`${baseUrl}/users/profile`, "PUT", userData);
}

export const userEarnLives = async () => {
    return await request(`${baseUrl}/users/profile/earnLive`, "GET");
}