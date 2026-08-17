import Header from "../../common/components/Header/Header";

import "./AboutPage.css";

function AboutPage() {

    return (
        <div className="about-layout">

            <Header />


            {/* =========================================
                HERO
            ========================================= */}

            <main className="about-main">

                <section className="about-hero">

                    <span className="about-label">
                        ABOUT OPEN QUANT
                    </span>

                    <h1>
                        Turning Market Data
                        <br />
                        Into Intelligence.
                    </h1>

                    <p>
                        Open Quant is a quantitative market intelligence
                        platform designed to combine financial data,
                        machine learning, and modern AI into a single
                        analytical experience.
                    </p>

                </section>


                {/* =========================================
                    VALUES
                ========================================= */}

                <section className="about-values">

                    <div className="about-section-heading">

                        <span>
                            OUR APPROACH
                        </span>

                        <h2>
                            Built around data and intelligence.
                        </h2>

                    </div>


                    <div className="about-values-grid">

                        <article className="about-value-card">

                            <div className="about-value-number">
                                01
                            </div>

                            <h3>
                                Data
                            </h3>

                            <p>
                                Transform raw market data into structured
                                information that can be explored,
                                analyzed, and understood.
                            </p>

                        </article>


                        <article className="about-value-card">

                            <div className="about-value-number">
                                02
                            </div>

                            <h3>
                                Intelligence
                            </h3>

                            <p>
                                Combine machine learning and AI techniques
                                to discover patterns and generate useful
                                market insights.
                            </p>

                        </article>


                        <article className="about-value-card">

                            <div className="about-value-number">
                                03
                            </div>

                            <h3>
                                Quant
                            </h3>

                            <p>
                                Apply quantitative thinking to market
                                analysis, forecasting, signals, and
                                systematic decision making.
                            </p>

                        </article>

                    </div>

                </section>


                {/* =========================================
                    WHAT WE BUILD
                ========================================= */}

                <section className="about-build">

                    <div className="about-build-content">

                        <span className="about-label">
                            WHAT WE BUILD
                        </span>

                        <h2>
                            A workspace for
                            <br />
                            quantitative thinking.
                        </h2>

                        <p>
                            Open Quant brings together market data,
                            quantitative models, forecasting systems,
                            and analytical tools to create a focused
                            environment for exploring financial markets.
                        </p>

                    </div>


                    <div className="about-build-grid">

                        <div className="about-build-item">

                            <span className="build-icon">
                                ◇
                            </span>

                            <div>
                                <h3>
                                    Market Intelligence
                                </h3>

                                <p>
                                    Monitor and understand market
                                    movements through structured data.
                                </p>
                            </div>

                        </div>


                        <div className="about-build-item">

                            <span className="build-icon">
                                ∿
                            </span>

                            <div>
                                <h3>
                                    Forecasting
                                </h3>

                                <p>
                                    Explore predictive models for
                                    quantitative market analysis.
                                </p>
                            </div>

                        </div>


                        <div className="about-build-item">

                            <span className="build-icon">
                                AI
                            </span>

                            <div>
                                <h3>
                                    AI & Machine Learning
                                </h3>

                                <p>
                                    Integrate modern AI techniques into
                                    quantitative workflows.
                                </p>
                            </div>

                        </div>


                        <div className="about-build-item">

                            <span className="build-icon">
                                Σ
                            </span>

                            <div>
                                <h3>
                                    Quantitative Research
                                </h3>

                                <p>
                                    Experiment with systematic approaches
                                    to financial data and models.
                                </p>
                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================================
                    MISSION
                ========================================= */}

                <section className="about-mission">

                    <div className="mission-card">

                        <span className="about-label">
                            OUR MISSION
                        </span>

                        <h2>
                            Make quantitative
                            <br />
                            intelligence accessible.
                        </h2>

                        <p>
                            We believe financial analysis should be
                            transparent, data-driven, and accessible to
                            people who want to understand markets through
                            technology.
                        </p>

                    </div>

                </section>

            </main>


            {/* =========================================
                FOOTER
            ========================================= */}

            <footer className="about-footer">

                <span>
                    Open Quant
                </span>

                <span>
                    Market Intelligence Platform
                </span>

            </footer>

        </div>
    );
}

export default AboutPage;