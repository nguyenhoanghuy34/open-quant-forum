import { useState } from "react";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";

function RegisterForm() {

    const [showPassword,setShowPassword]=useState(false);

    const [showConfirm,setShowConfirm]=useState(false);

    return (

        <form className="login-form">

            {/* FULL NAME */}

            <div className="input-group">

                <label>Full Name</label>

                <div className="input-wrapper">

                    <User size={18}/>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                    />

                </div>

            </div>

            {/* EMAIL */}

            <div className="input-group">

                <label>Email</label>

                <div className="input-wrapper">

                    <Mail size={18}/>

                    <input
                        type="email"
                        placeholder="Enter your email"
                    />

                </div>

            </div>

            {/* PASSWORD */}

            <div className="input-group">

                <label>Password</label>

                <div className="input-wrapper">

                    <Lock size={18}/>

                    <input
                        type={showPassword?"text":"password"}
                        placeholder="Create password"
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={()=>setShowPassword(!showPassword)}
                    >
                        {
                            showPassword
                            ?<EyeOff size={18}/>
                            :<Eye size={18}/>
                        }
                    </button>

                </div>

            </div>

            {/* CONFIRM */}

            <div className="input-group">

                <label>Confirm Password</label>

                <div className="input-wrapper">

                    <Lock size={18}/>

                    <input
                        type={showConfirm?"text":"password"}
                        placeholder="Confirm password"
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={()=>setShowConfirm(!showConfirm)}
                    >
                        {
                            showConfirm
                            ?<EyeOff size={18}/>
                            :<Eye size={18}/>
                        }
                    </button>

                </div>

            </div>

            <label className="remember-me">

                <input type="checkbox"/>

                <span>
                    I agree to the Terms & Privacy Policy
                </span>

            </label>

            <button
                className="login-button"
                type="submit"
            >
                Create Account
            </button>

        </form>

    );

}

export default RegisterForm;
