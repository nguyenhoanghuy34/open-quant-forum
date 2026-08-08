import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";

import {
    registerSchema,
} from "../../auth/validation/registerSchema";

import useAuth from "../../auth/hooks/useAuth";


function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm({
        resolver: zodResolver(registerSchema),

        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });


    const {
        registerAccount,
        loading,
        error,
    } = useAuth();


    const onSubmit = async (data) => {

        try {

            await registerAccount({
                username: data.username,
                email: data.email,
                password: data.password,
            });

            window.location.href = "/login";

        } catch {

            // Error is handled by useAuth

        }

    };


    return (

        <form
            className="login-form"
            onSubmit={handleSubmit(onSubmit)}
        >

            {/* USERNAME */}

            <div className="input-group">

                <label>
                    Username
                </label>

                <div
                    className={`input-wrapper ${
                        errors.username
                            ? "input-error"
                            : ""
                    }`}
                >

                    <User size={18} />

                    <input
                        type="text"
                        placeholder="Choose a username"
                        {...register("username")}
                    />

                </div>

                {errors.username && (

                    <span className="error-message">
                        {errors.username.message}
                    </span>

                )}

            </div>


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
                        placeholder="Create a password"
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


            {/* CONFIRM PASSWORD */}

            <div className="input-group">

                <label>
                    Confirm Password
                </label>

                <div
                    className={`input-wrapper ${
                        errors.confirmPassword
                            ? "input-error"
                            : ""
                    }`}
                >

                    <Lock size={18} />

                    <input
                        type={
                            showConfirm
                                ? "text"
                                : "password"
                        }
                        placeholder="Confirm your password"
                        {...register("confirmPassword")}
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() =>
                            setShowConfirm(
                                !showConfirm
                            )
                        }
                    >

                        {showConfirm ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}

                    </button>

                </div>

                {errors.confirmPassword && (

                    <span className="error-message">
                        {errors.confirmPassword.message}
                    </span>

                )}

            </div>


            {/* TERMS */}

            <label className="remember-me">

                <input
                    type="checkbox"
                    {...register("terms")}
                />

                <span>
                    I agree to the Terms & Privacy Policy
                </span>

            </label>

            {errors.terms && (

                <span className="error-message">
                    {errors.terms.message}
                </span>

            )}


            {/* SERVER ERROR */}

            {error && (

                <div className="auth-error">
                    {error}
                </div>

            )}


            {/* REGISTER */}

            <button
                type="submit"
                className="login-button"
                disabled={loading}
            >

                {loading
                    ? "Creating account..."
                    : "Create Account"
                }

            </button>

        </form>
    );
}


export default RegisterForm;