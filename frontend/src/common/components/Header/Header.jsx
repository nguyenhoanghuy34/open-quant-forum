import { NavLink } from "react-router-dom";

import "./Header.css";

function Header() {
    return (
        <header className="app-header">

            {/* LOGO */}
            <NavLink
                to="/home"
                className="app-header-logo"
            >
                <span className="app-header-logo-mark">
                    OQF
                </span>

                <span className="app-header-logo-text">
                    Open Quant
                </span>
            </NavLink>


            {/* NAVIGATION */}
            <nav className="app-header-nav">

                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        `app-header-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    Home
                </NavLink>


                <NavLink
                    to="/news"
                    className={({ isActive }) =>
                        `app-header-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    News
                </NavLink>


                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `app-header-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    About Us
                </NavLink>

            </nav>


            {/* USER */}
            <div className="app-header-user">

                <button
                    type="button"
                    className="app-header-avatar"
                    aria-label="User menu"
                >
                    U
                </button>

            </div>

        </header>
    );
}

export default Header;