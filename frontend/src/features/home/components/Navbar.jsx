import { NavLink } from "react-router-dom";


function Navbar() {

    return (
        <nav className="navbar">

            {/* =========================================
                LOGO
            ========================================= */}

            <div className="navbar-logo">

                <span className="logo-mark">
                    ✦
                </span>

                <span className="logo-text">
                    Open Quant
                </span>

            </div>


            {/* =========================================
                NAVIGATION
            ========================================= */}

            <div className="navbar-nav">

                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        `nav-link ${
                            isActive
                                ? "active"
                                : ""
                        }`
                    }
                >
                    Home
                </NavLink>


                <NavLink
                    to="/news"
                    className={({ isActive }) =>
                        `nav-link ${
                            isActive
                                ? "active"
                                : ""
                        }`
                    }
                >
                    News
                </NavLink>


                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `nav-link ${
                            isActive
                                ? "active"
                                : ""
                        }`
                    }
                >
                    About Us
                </NavLink>

            </div>


            {/* =========================================
                USER AVATAR
            ========================================= */}

            <div className="navbar-user">

                <button
                    type="button"
                    className="user-avatar"
                    aria-label="User menu"
                >
                    U
                </button>

            </div>

        </nav>
    );
}


export default Navbar;
