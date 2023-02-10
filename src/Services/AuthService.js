import { baseUrl, request } from "./request"

export const login = async (userData) => {
    return await request(`${baseUrl}/login`, "POST", userData);
}

export const register = async (userData) => {
    return await request(`${baseUrl}/register`, "POST", userData)
}

export const getCurrentUser = async (userData) => {
    return await request(`${baseUrl}/users/profile`, "GET");
}

export const editCurrentUser = async (userData) => {
    return await request(`${baseUrl}/users/profile`, "PUT", userData);
}