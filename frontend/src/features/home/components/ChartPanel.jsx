function ChartPanel() {
    return (
        <section className="glass-panel chart-panel">

            <div className="panel-header">

                <div>
                    <span className="panel-label">
                        MARKET OVERVIEW
                    </span>

                    <h2>
                        Price Chart
                    </h2>
                </div>

                <span className="coming-soon">
                    Coming soon
                </span>

            </div>


            <div className="chart-placeholder">

                <div className="placeholder-grid" />

                <div className="placeholder-content">

                    <div className="placeholder-icon">
                        ◇
                    </div>

                    <h3>
                        Market chart
                    </h3>

                    <p>
                        Interactive market visualization
                        will appear here.
                    </p>

                </div>

            </div>

        </section>
    );
}


export default ChartPanel;