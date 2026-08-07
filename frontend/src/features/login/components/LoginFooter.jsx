import { Link } from "react-router-dom";

function LoginFooter() {
    return (
        <footer className="login-footer">

            <p>

                Don't have an account?

                <Link to="/register">

                    Sign Up

                </Link>

            </p>

        </footer>
    );
}

export default LoginFooter;