import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authApi = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});


/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
| Tự động gắn JWT vào request.
*/

authApi.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("access_token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;
    },

    (error) => {

        return Promise.reject(error);

    }
);


/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
| Nếu JWT hết hạn / không hợp lệ:
|
| 401 → xóa token → đưa user về login.
*/

authApi.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem(
                "access_token"
            );

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);


/*
|--------------------------------------------------------------------------
| Authentication APIs
|--------------------------------------------------------------------------
*/

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