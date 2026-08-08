import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../features/auth/context/AuthContext";


function ProtectedRoute() {

    const {
        isAuthenticated,
        loading,
    } = useAuthContext();


    if (loading) {

        return (
            <div className="auth-loading">
                Loading...
            </div>
        );
    }


    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    return <Outlet />;
}


export default ProtectedRoute;