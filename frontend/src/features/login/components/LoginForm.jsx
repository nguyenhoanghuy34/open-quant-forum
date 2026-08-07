import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className="login-form">

            {/* ================= EMAIL ================= */}

            <div className="input-group">

                <label>Email</label>

                <div className="input-wrapper">

                    <Mail size={18} />

                    <input
                        type="email"
                        placeholder="Enter your email"
                    />

                </div>

            </div>

            {/* ================= PASSWORD ================= */}

            <div className="input-group">

                <label>Password</label>

                <div className="input-wrapper">

                    <Lock size={18} />

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>

                </div>

            </div>

            {/* ================= OPTIONS ================= */}

            <div className="login-options">

                <label className="remember-me">

                    <input type="checkbox" />

                    <span>Remember me</span>

                </label>

                <a href="#">
                    Forgot password?
                </a>

            </div>

            {/* ================= BUTTON ================= */}

            <button
                type="submit"
                className="login-button"
            >
                Sign In
            </button>

        </form>
    );
}

export default LoginForm;
