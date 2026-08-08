import { useState } from "react";

import {
    loginUser,
    registerUser,
} from "../services/authService";


function useAuth() {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    const login = async (data) => {

        setLoading(true);

        setError(null);

        try {

            const response =
                await loginUser(data);

            localStorage.setItem(
                "access_token",
                response.access_token
            );

            return response;

        } catch (error) {

            const message =
                error.response?.data?.detail ||
                "Login failed.";

            setError(message);

            throw error;

        } finally {

            setLoading(false);

        }
    };


    const registerAccount = async (data) => {

        setLoading(true);

        setError(null);

        try {

            return await registerUser(data);

        } catch (error) {

            const message =
                error.response?.data?.detail ||
                "Registration failed.";

            setError(message);

            throw error;

        } finally {

            setLoading(false);

        }
    };


    return {
        login,
        registerAccount,
        loading,
        error,
    };
}


export default useAuth;