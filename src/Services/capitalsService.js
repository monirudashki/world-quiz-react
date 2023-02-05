import { baseUrl, request } from "./request";

export const createCapitalsQuestion = async (questionData) => {
    await request(`${baseUrl}/capitals`, "POST", questionData);
}