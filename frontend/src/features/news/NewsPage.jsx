import "./NewsPage.css";

function NewsPage() {

    const news = [
        {
            id: 1,
            category: "MARKET",
            title: "Bitcoin Holds Above Key Support as Market Volatility Eases",
            summary:
                "Bitcoin continues to trade near a key support zone as short-term volatility declines. Traders are closely watching momentum and liquidity conditions for the next major move.",
            time: "2 hours ago",
        },
        {
            id: 2,
            category: "AI & QUANT",
            title: "AI Models Gain Attention in Short-Term Crypto Forecasting",
            summary:
                "Modern time-series models are increasingly being tested for short-term cryptocurrency forecasting, combining historical price patterns with market signals to estimate future movements.",
            time: "5 hours ago",
        },
    ];

    return (
        <div className="news-layout">

            <main className="news-main">

                {/* =========================================
                    HEADER
                ========================================= */}

                <section className="news-heading">

                    <div>
                        <span className="news-label">
                            MARKET INTELLIGENCE
                        </span>

                        <h1>
                            News
                        </h1>

                        <p>
                            Latest market and quantitative intelligence.
                        </p>
                    </div>

                </section>


                {/* =========================================
                    NEWS LIST
                ========================================= */}

                <section className="news-section">

                    <div className="news-section-header">

                        <h2>
                            Latest News
                        </h2>

                        <span>
                            {news.length} stories
                        </span>

                    </div>


                    <div className="news-grid">

                        {news.map((item) => (

                            <article
                                key={item.id}
                                className="news-card"
                            >

                                {/* CATEGORY */}

                                <div className="news-card-top">

                                    <span className="news-category">
                                        {item.category}
                                    </span>

                                    <span className="news-time">
                                        {item.time}
                                    </span>

                                </div>


                                {/* TITLE */}

                                <h3 className="news-title">
                                    {item.title}
                                </h3>


                                {/* SUMMARY */}

                                <p className="news-summary">
                                    {item.summary}
                                </p>


                                {/* FOOTER */}

                                <div className="news-card-footer">

                                    <span>
                                        Open Quant
                                    </span>

                                    <span className="news-arrow">
                                        →
                                    </span>

                                </div>

                            </article>

                        ))}

                    </div>

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