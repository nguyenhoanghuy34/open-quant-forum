import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getCurrentUser,
    logoutUser,
} from "../services/authService";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    const loadUser = async () => {

        const token =
            localStorage.getItem("access_token");

        if (!token) {

            setLoading(false);

            return;
        }

        try {

            const currentUser =
                await getCurrentUser();

            setUser(currentUser);

        } catch {

            logoutUser();

            setUser(null);

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadUser();

    }, []);


    const logout = () => {

        logoutUser();

        setUser(null);

        window.location.href = "/login";
    };


    const isAuthenticated = Boolean(user);


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                logout,
                refreshUser: loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuthContext() {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuthContext must be used inside AuthProvider"
        );
    }

    return context;
}