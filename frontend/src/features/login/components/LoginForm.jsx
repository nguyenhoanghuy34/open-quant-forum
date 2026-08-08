import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";

import { useState } from "react";

import { loginSchema } from "../../auth/validation/loginSchema";
import useAuth from "../../auth/hooks/useAuth";


function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });


    const {
        login,
        loading,
        error,
    } = useAuth();


    const onSubmit = async (data) => {

        try {

            await login(data);

            window.location.href = "/";

        } catch {

            // Error is handled by useAuth

        }

    };


    return (

        <form
            className="login-form"
            onSubmit={handleSubmit(onSubmit)}
        >

            {/* EMAIL */}

            <div className="input-group">

                <label>
                    Email
                </label>

                <div
                    className={`input-wrapper ${
                        errors.email
                            ? "input-error"
                            : ""
                    }`}
                >

                    <Mail size={18} />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                    />

                </div>

                {errors.email && (

                    <span className="error-message">
                        {errors.email.message}
                    </span>

                )}

            </div>


            {/* PASSWORD */}

            <div className="input-group">

                <label>
                    Password
                </label>

                <div
                    className={`input-wrapper ${
                        errors.password
                            ? "input-error"
                            : ""
                    }`}
                >

                    <Lock size={18} />

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        placeholder="Enter your password"
                        {...register("password")}
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                    >

                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}

                    </button>

                </div>

                {errors.password && (

                    <span className="error-message">
                        {errors.password.message}
                    </span>

                )}

            </div>


            {/* OPTIONS */}

            <div className="login-options">

                <label className="remember-me">

                    <input
                        type="checkbox"
                        {...register("remember")}
                    />

                    <span>
                        Remember me
                    </span>

                </label>

                <a href="#">
                    Forgot password?
                </a>

            </div>


            {/* SERVER ERROR */}

            {error && (

                <div className="auth-error">
                    {error}
                </div>

            )}


            {/* LOGIN */}

            <button
                type="submit"
                className="login-button"
                disabled={loading}
            >

                {loading
                    ? "Signing in..."
                    : "Sign In"
                }

            </button>

        </form>
    );
}


export default LoginForm;