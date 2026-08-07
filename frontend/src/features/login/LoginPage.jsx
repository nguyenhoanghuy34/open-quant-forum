import LoginCard from "./components/LoginCard";
import "./styles/login.css";

function LoginPage() {
    return (
        <main className="login-page">

            <div className="background">

                <span className="blob blob-1"></span>

                <span className="blob blob-2"></span>

                <span className="grid"></span>

            </div>

            <LoginCard />

        </main>
    );
}

export default LoginPage;