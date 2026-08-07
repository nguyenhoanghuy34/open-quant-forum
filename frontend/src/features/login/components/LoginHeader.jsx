import { LockKeyhole } from "lucide-react";

function LoginHeader() {
    return (
        <header className="login-header">

            <div className="logo-circle">

                <LockKeyhole size={28} />

            </div>

            <h1>Welcome Back</h1>

            <p>
                Sign in to continue to Open Quant Forum
            </p>

        </header>
    );
}

export default LoginHeader;
