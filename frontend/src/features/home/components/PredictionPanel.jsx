import { useState } from "react";


function PredictionPanel() {

    const [selectedModel, setSelectedModel] =
        useState("Chronos-2");


    return (
        <section className="glass-panel prediction-panel">

            {/* =========================================
                HEADER
            ========================================= */}

            <div className="panel-header">

                <div>

                    <span className="panel-label">
                        AI MODEL
                    </span>

                    <h2>
                        Prediction
                    </h2>

                </div>


                {/* =========================================
                    MODEL SELECT
                ========================================= */}

                <select
                    value={selectedModel}
                    onChange={(event) =>
                        setSelectedModel(
                            event.target.value
                        )
                    }
                    className="model-select"
                >

                    <option value="Chronos-2">
                        Chronos-2
                    </option>

                    <option value="TimesFM">
                        TimesFM
                    </option>

                </select>

            </div>


            {/* =========================================
                PREDICTION PLACEHOLDER
            ========================================= */}

            <div className="prediction-placeholder">

                <div className="prediction-icon">
                    ✦
                </div>


                <h3>
                    {selectedModel}
                </h3>


                <p>
                    AI-powered market predictions
                    will appear here.
                </p>


                {/* =========================================
                    MODEL STATUS
                ========================================= */}

                <div className="model-status">

                    <span className="status-dot" />

                    <span>
                        Model not connected
                    </span>

                </div>


                {/* =========================================
                    PREDICTION STATS
                ========================================= */}

                <div className="prediction-stats">

                    <div>

                        <span>
                            Signal
                        </span>

                        <strong>
                            —
                        </strong>

                    </div>


                    <div>

                        <span>
                            Confidence
                        </span>

                        <strong>
                            —
                        </strong>

                    </div>

                </div>

            </div>

        </section>
    );
}


export default PredictionPanel;