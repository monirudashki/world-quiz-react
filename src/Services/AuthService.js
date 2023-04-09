import axios from "axios";
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

export const register = async (formData) => {
    return await axios.post(`${baseUrl}/register`, formData);
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

export const getUsersByPage = async (currentPage) => {
    return fetch(`http://localhost:3030/api/users?page=${currentPage}`)
        .then(res => res.json());
}

export const uploadImage = async (formData) => {
    return axios.post('http://localhost:3030/api/users/profile/fileUpload', formData)
}
