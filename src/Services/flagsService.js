import { baseUrl, request } from "./request";

export const createFlagsQuestion = async (questionData) => {
    await request(`${baseUrl}/flags`, "POST", questionData);
}

export const getCapitalsQuestion = async (page) => {
    await request(`${baseUrl}/capitals?page=${page}`, "GET");
}