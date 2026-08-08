function PredictionPanel() {
    return (
        <section className="glass-panel prediction-panel">

            <div className="panel-header">

                <div>
                    <span className="panel-label">
                        AI MODEL
                    </span>

                    <h2>
                        Prediction
                    </h2>
                </div>

                <span className="coming-soon">
                    Coming soon
                </span>

            </div>


            <div className="prediction-placeholder">

                <div className="prediction-icon">
                    ✦
                </div>

                <h3>
                    Model prediction
                </h3>

                <p>
                    AI-powered market predictions
                    will appear here.
                </p>


                <div className="prediction-stats">

                    <div>
                        <span>Signal</span>
                        <strong>—</strong>
                    </div>

                    <div>
                        <span>Confidence</span>
                        <strong>—</strong>
                    </div>

                </div>

            </div>

        </section>
    );
}


export default PredictionPanel;