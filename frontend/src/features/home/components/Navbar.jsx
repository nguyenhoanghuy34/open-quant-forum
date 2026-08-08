import { User } from "lucide-react";

import { useAuthContext } from "../../auth/context/AuthContext";


function Navbar() {

    const { user } = useAuthContext();

    return (
        <header className="home-navbar">

            <div className="home-logo">
                <span className="logo-mark">
                    OQ
                </span>

                <span className="logo-text">
                    Open Quant Forum
                </span>
            </div>


            <button
                className="user-avatar"
                type="button"
            >
                {user?.username
                    ?.charAt(0)
                    ?.toUpperCase() || (
                        <User size={18} />
                    )}
            </button>

        </header>
    );
}


export default Navbar;