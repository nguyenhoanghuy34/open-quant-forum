import { Link } from "react-router-dom";

function RegisterFooter() {
    return (
        <footer className="login-footer">

            <p>

                Already have an account?

                <Link to="/login">

                    Sign In

                </Link>

            </p>

        </footer>
    );
}

export default RegisterFooter;
