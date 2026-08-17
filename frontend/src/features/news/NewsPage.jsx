import { useState } from "react";

import Header from "../../common/components/Header/Header";

import "./NewsPage.css";


function NewsPage() {

    const [activeCategory, setActiveCategory] =
        useState("advanced");


    const newsData = {

        advanced: {
            label: "ADVANCED MODEL",
            title: "AI Model Intelligence",
            description:
                "Insights generated from the latest generation of advanced AI and quantitative models.",
            articles: [
                {
                    category: "AI MODEL",
                    title:
                        "Next-Generation AI Models Improve Financial Market Reasoning",
                    summary:
                        "Modern foundation models are becoming increasingly capable of processing complex financial information, combining numerical data, news, and market context.",
                    time: "2 hours ago",
                },
                {
                    category: "QUANT AI",
                    title:
                        "Large Models Explore New Approaches to Market Forecasting",
                    summary:
                        "Researchers are experimenting with advanced architectures for time-series forecasting, signal generation, and financial decision support.",
                    time: "5 hours ago",
                },
            ],
        },


        bitcoin: {
            label: "BITCOIN NEWS",
            title: "Bitcoin News",
            description:
                "Latest updates and market developments surrounding Bitcoin.",
            articles: [
                {
                    category: "BITCOIN",
                    title:
                        "Bitcoin Trades Near Key Support as Traders Watch Market Momentum",
                    summary:
                        "Bitcoin remains within a closely watched price range as traders evaluate liquidity, momentum, and short-term market direction.",
                    time: "1 hour ago",
                },
                {
                    category: "BTC MARKET",
                    title:
                        "Bitcoin Volatility Declines as Market Enters Consolidation",
                    summary:
                        "Short-term volatility appears to be cooling as Bitcoin moves sideways and market participants wait for a stronger directional signal.",
                    time: "4 hours ago",
                },
            ],
        },


        market: {
            label: "MARKET NEWS",
            title: "Market News",
            description:
                "General financial market intelligence and quantitative observations.",
            articles: [
                {
                    category: "GLOBAL MARKET",
                    title:
                        "Global Markets Remain Focused on Interest Rate Expectations",
                    summary:
                        "Investors continue to monitor monetary policy expectations as economic data influences risk sentiment across major markets.",
                    time: "3 hours ago",
                },
                {
                    category: "MARKET",
                    title:
                        "Risk Assets Show Mixed Performance Across Major Markets",
                    summary:
                        "Equity and digital asset markets are showing mixed signals as investors balance economic data with changing expectations for monetary policy.",
                    time: "6 hours ago",
                },
            ],
        },

    };


    const currentNews = newsData[activeCategory];


    return (

        <div className="news-layout">


            <main className="news-main">

                {/* =========================================
                    PAGE HEADER
                ========================================= */}

                <section className="news-heading">

                    <span className="news-label">
                        MARKET INTELLIGENCE
                    </span>

                    <h1>
                        News
                    </h1>

                    <p>
                        Explore market intelligence, Bitcoin updates,
                        and insights from advanced AI models.
                    </p>

                </section>


                {/* =========================================
                    NEWS BODY
                ========================================= */}

                <section className="news-body">


                    {/* =====================================
                        SIDEBAR
                    ===================================== */}

                    <aside className="news-sidebar">

                        <div className="news-sidebar-title">
                            NEWS
                        </div>


                        <button
                            type="button"
                            className={
                                `news-sidebar-item ${
                                    activeCategory === "advanced"
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() =>
                                setActiveCategory("advanced")
                            }
                        >

                            <span className="sidebar-dot">
                                ◇
                            </span>

                            <span>
                                Advanced Model
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                `news-sidebar-item ${
                                    activeCategory === "bitcoin"
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() =>
                                setActiveCategory("bitcoin")
                            }
                        >

                            <span className="sidebar-dot">
                                ₿
                            </span>

                            <span>
                                Bitcoin News
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                `news-sidebar-item ${
                                    activeCategory === "market"
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() =>
                                setActiveCategory("market")
                            }
                        >

                            <span className="sidebar-dot">
                                Σ
                            </span>

                            <span>
                                Market News
                            </span>

                        </button>

                    </aside>


                    {/* =====================================
                        CONTENT
                    ===================================== */}

                    <section className="news-content">


                        <div className="news-content-header">

                            <div>

                                <span className="news-content-label">
                                    {currentNews.label}
                                </span>

                                <h2>
                                    {currentNews.title}
                                </h2>

                                <p>
                                    {currentNews.description}
                                </p>

                            </div>


                            <span className="news-count">
                                {currentNews.articles.length} stories
                            </span>

                        </div>


                        {/* =================================
                            ARTICLES
                        ================================= */}

                        <div className="news-grid">

                            {currentNews.articles.map((article) => (

                                <article
                                    key={article.title}
                                    className="news-card"
                                >

                                    <div className="news-card-top">

                                        <span className="news-category">
                                            {article.category}
                                        </span>

                                        <span className="news-time">
                                            {article.time}
                                        </span>

                                    </div>


                                    <h3 className="news-title">
                                        {article.title}
                                    </h3>


                                    <p className="news-summary">
                                        {article.summary}
                                    </p>


                                    <div className="news-card-footer">

                                        <span>
                                            Open Quant Intelligence
                                        </span>

                                        <span className="news-arrow">
                                            →
                                        </span>

                                    </div>

                                </article>

                            ))}

                        </div>

                    </section>

                </section>

            </main>


            {/* =========================================
                FOOTER
            ========================================= */}

            <footer className="news-footer">

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


export default NewsPage;