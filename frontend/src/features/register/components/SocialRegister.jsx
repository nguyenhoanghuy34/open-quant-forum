import { FaGoogle, FaGithub } from "react-icons/fa";

function SocialRegister() {
    return (
        <section className="social-login">

            <div className="divider">

                <span></span>

                <p>OR SIGN UP WITH</p>

                <span></span>

            </div>

            <div className="social-buttons">

                <button
                    type="button"
                    className="social-button"
                >
                    <FaGoogle />

                    <span>Google</span>
                </button>

                <button
                    type="button"
                    className="social-button"
                >
                    <FaGithub />

                    <span>GitHub</span>
                </button>

            </div>

        </section>
    );
}

export default SocialRegister;
