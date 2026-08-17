function NewsCard({ news }) {

    return (

        <article className="news-card">

            <div className="news-card-top">

                <span className="news-card-category">
                    {news.category}
                </span>

                <span className="news-card-time">
                    {news.time}
                </span>

            </div>


            <h3 className="news-card-title">
                {news.title}
            </h3>


            <p className="news-card-description">
                {news.description}
            </p>


            <div className="news-card-footer">

                <span>
                    Source: {news.source}
                </span>

                <button
                    type="button"
                    className="news-read-button"
                >
                    Read More →
                </button>

            </div>

        </article>

    );
}


export default NewsCard;