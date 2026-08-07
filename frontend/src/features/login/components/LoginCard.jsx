import { motion } from "framer-motion";

import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";
import LoginFooter from "./LoginFooter";

function LoginCard() {
    return (
        <motion.section
            className="login-card"
            initial={{
                opacity: 0,
                y: 40,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.6,
            }}
        >
            <LoginHeader />

            <LoginForm />

            <SocialLogin />

            <LoginFooter />
        </motion.section>
    );
}

export default LoginCard;