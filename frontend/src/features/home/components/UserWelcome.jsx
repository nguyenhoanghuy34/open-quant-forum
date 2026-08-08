import {
    LogOut,
    User,
} from "lucide-react";

import {
    useAuthContext,
} from "../../auth/context/AuthContext";


function UserWelcome() {

    const {
        user,
        logout,
    } = useAuthContext();


    return (
        <section className="home-card">

            <div className="home-icon">
                <User size={32} />
            </div>


            <h1>
                Welcome, {user?.username}
            </h1>


            <p>
                {user?.email}
            </p>


            <button
                type="button"
                className="logout-button"
                onClick={logout}
            >
                <LogOut size={18} />

                <span>
                    Logout
                </span>
            </button>

        </section>
    );
}


export default UserWelcome;