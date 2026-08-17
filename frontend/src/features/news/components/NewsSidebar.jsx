const categories = [

    {
        id: "advanced-model",
        label: "Advanced Model",
        description: "AI & Models",
    },

    {
        id: "bitcoin",
        label: "Bitcoin News",
        description: "BTC & Crypto",
    },

    {
        id: "market",
        label: "Market News",
        description: "Financial Markets",
    },

];


function NewsSidebar({
    activeCategory,
    setActiveCategory,
}) {

    return (

        <aside className="news-sidebar">

            <div className="news-sidebar-title">
                NEWS SOURCES
            </div>


            <div className="news-sidebar-menu">

                {categories.map((category) => (

                    <button
                        key={category.id}
                        type="button"
                        className={
                            `news-sidebar-item ${
                                activeCategory === category.id
                                    ? "active"
                                    : ""
                            }`
                        }
                        onClick={() =>
                            setActiveCategory(category.id)
                        }
                    >

                        <span className="news-sidebar-item-label">
                            {category.label}
                        </span>

                        <span className="news-sidebar-item-description">
                            {category.description}
                        </span>

                    </button>

                ))}

            </div>

        </aside>

    );
}


export default NewsSidebar;