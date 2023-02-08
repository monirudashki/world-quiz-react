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