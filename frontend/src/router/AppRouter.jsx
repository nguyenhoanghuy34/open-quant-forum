import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import LoginPage from "../features/login";
import RegisterPage from "../features/register";
import HomePage from "../features/home";

import NewsPage from "../features/news/NewsPage";
import AboutPage from "../features/about/AboutPage";

import ProtectedRoute from "./ProtectedRoute";


function AppRouter() {

    return (
        <BrowserRouter>

            <Routes>

                {/* =========================================
                    PUBLIC
                ========================================= */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/home"
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />


                {/* =========================================
                    PROTECTED
                ========================================= */}

                <Route
                    element={<ProtectedRoute />}
                >

                    <Route
                        path="/home"
                        element={<HomePage />}
                    />

                    <Route
                        path="/news"
                        element={<NewsPage />}
                    />

                    <Route
                        path="/about"
                        element={<AboutPage />}
                    />

                </Route>


                {/* =========================================
                    FALLBACK
                ========================================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/home"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default AppRouter;