import { baseUrl, request } from "./request";

export const createFlagsQuestion = async (questionData) => {
    await request(`${baseUrl}/flags`, "POST", questionData);
}

export const getCapitalsQuestion = async (page) => {
    await request(`${baseUrl}/capitals?page=${page}`, "GET");
}

export const getFlagsQuestionById = async (id) => {
    return fetch(`http://localhost:3030/api/flags/${id}`, {
        credentials: 'include'
    })
        .then(res => res.json())
} 