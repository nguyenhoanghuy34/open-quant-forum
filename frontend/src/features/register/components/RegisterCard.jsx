import { motion } from "framer-motion";

import RegisterHeader from "./RegisterHeader";
import RegisterForm from "./RegisterForm";
import SocialRegister from "./SocialRegister";
import RegisterFooter from "./RegisterFooter";

function RegisterCard() {
    return (
        <motion.section
            className="login-card"
            initial={{
                opacity: 0,
                y: 40,
                scale: .96
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}
            transition={{
                duration: .6
            }}
        >

            <RegisterHeader />

            <RegisterForm />

            <SocialRegister />

            <RegisterFooter />

        </motion.section>
    );
}

export default RegisterCard;
