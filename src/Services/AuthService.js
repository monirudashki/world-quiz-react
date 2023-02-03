import { baseUrl, request } from "./request"

export const login = async (userData) => {
    await request(`${baseUrl}/login`, "POST", userData);
}