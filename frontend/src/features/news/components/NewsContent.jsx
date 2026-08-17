import NewsCard from "./NewsCard";

import { newsData } from "../data/newsData";


function NewsContent({ category }) {

    const news = newsData[category] || [];


    return (

        <section className="news-content">

            <div className="news-content-header">

                <div>

                    <span className="news-content-eyebrow">
                        LATEST
                    </span>

                    <h2>
                        {getCategoryTitle(category)}
                    </h2>

                </div>


                <span className="news-count">
                    {news.length} Articles
                </span>

            </div>


            <div className="news-list">

                {news.map((item) => (

                    <NewsCard
                        key={item.id}
                        news={item}
                    />

                ))}

            </div>

        </section>

    );
}


function getCategoryTitle(category) {

    switch (category) {

        case "advanced-model":
            return "Advanced Models";

        case "bitcoin":
            return "Bitcoin News";

        case "market":
            return "Market News";

        default:
            return "Latest News";
    }
}


export default NewsContent;