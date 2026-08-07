import { FaGoogle, FaGithub } from "react-icons/fa";

function SocialLogin() {
    return (
        <section className="social-login">

            <div className="divider">
                <span></span>
                <p>OR CONTINUE WITH</p>
                <span></span>
            </div>

            <div className="social-buttons">

                <button className="social-button">
                    <FaGoogle />
                    <span>Google</span>
                </button>

                <button className="social-button">
                    <FaGithub />
                    <span>GitHub</span>
                </button>

            </div>

        </section>
    );
}

export default SocialLogin;