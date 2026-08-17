import { useState } from "react";

import Header from "../../common/components/Header/Header";

import NewsSidebar from "./components/NewsSidebar";
import NewsContent from "./components/NewsContent";

import "./styles/news.css";


function NewsPage() {

    const [activeCategory, setActiveCategory] =
        useState("advanced-model");


    return (

        <div className="news-layout">


            <main className="news-main">

                <div className="news-page-header">

                    <span className="news-eyebrow">
                        MARKET INTELLIGENCE
                    </span>

                    <h1>
                        News
                    </h1>

                    <p>
                        Stay updated with the latest developments
                        in artificial intelligence, Bitcoin and financial markets.
                    </p>

                </div>


                <div className="news-body">

                    <NewsSidebar
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />


                    <NewsContent
                        category={activeCategory}
                    />

                </div>

            </main>


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