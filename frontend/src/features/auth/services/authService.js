import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authApi = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});


authApi.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem(
            "access_token"
        );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;
    },

    (error) => Promise.reject(error)
);


authApi.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem(
                "access_token"
            );

            if (
                window.location.pathname !== "/login"
            ) {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


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


export async function getCurrentUser() {

    const response = await authApi.get(
        "/users/me"
    );

    return response.data;
}


export function logoutUser() {

    localStorage.removeItem(
        "access_token"
    );
}


export default authApi;