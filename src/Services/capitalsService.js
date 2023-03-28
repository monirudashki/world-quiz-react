import { baseUrl, request } from "./request";

export const createCapitalsQuestion = async (questionData) => {
    await request(`${baseUrl}/capitals`, "POST", questionData);
}

export const getCapitalsQuestion = async (page) => {
    await request(`${baseUrl}/capitals?page=${page}`, "GET");
}

export const editCapitalsQuestion = async (questionId, questionData) => {
    await request(`${baseUrl}/capitals/${questionId}/edit`, "PUT", questionData);
}

export const updateUser = (updateUserData) => {
    return fetch(`http://localhost:3030/api/users/profile/update`, {
        method: "PUT",
        headers: { 'Content-type': 'Application/json' },
        credentials: 'include',
        body: JSON.stringify(updateUserData)
    });
}

export const getCapitalsQuestionById = async (id) => {
    return fetch(`http://localhost:3030/api/capitals/${id}`, {
        credentials: 'include'
    })
        .then(res => res.json())
} 