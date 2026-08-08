import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authApi = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function registerUser(data) {
    const response = await authApi.post(
        "/auth/register",
        data
    );

    return response.data;
}

export async function loginUser(data) {
    const response = await authApi.post(
        "/auth/login",
        data
    );

    return response.data;
}
