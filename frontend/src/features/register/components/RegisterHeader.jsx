import { UserPlus } from "lucide-react";

function RegisterHeader() {
    return (
        <header className="login-header">

            <div className="logo-circle">
                <UserPlus size={28}/>
            </div>

            <h1>Create Account</h1>

            <p>
                Join Open Quant Forum today.
            </p>

        </header>
    );
}

export default RegisterHeader;
