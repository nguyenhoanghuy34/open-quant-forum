import RegisterCard from "./components/RegisterCard";
import "../login/styles/login.css";

function RegisterPage() {
    return (
        <main className="login-page">

            <div className="background">

                <span className="blob blob-1"></span>

                <span className="blob blob-2"></span>

                <span className="grid"></span>

            </div>

            <RegisterCard />

        </main>
    );
}

export default RegisterPage;
