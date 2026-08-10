import { useEffect, useState } from "react";


const API_WS_URL =
    "ws://127.0.0.1:8000/api/market-data/ws";


function PredictionPanel() {

    const [selectedModel, setSelectedModel] =
        useState("Chronos-2");

    const [currentPrice, setCurrentPrice] =
        useState(null);


    // =====================================================
    // REALTIME MARKET PRICE
    // =====================================================

    useEffect(() => {

        const socket =
            new WebSocket(
                API_WS_URL
            );


        socket.onmessage = (event) => {

            try {

                const message =
                    JSON.parse(
                        event.data
                    );


                if (
                    message.type !==
                    "candle"
                ) {

                    return;
                }


                const close =
                    Number(
                        message.data?.close
                    );


                if (
                    Number.isFinite(
                        close
                    )
                ) {

                    setCurrentPrice(
                        close
                    );
                }

            } catch (error) {

                console.error(
                    "Prediction price error:",
                    error
                );
            }
        };


        socket.onerror = (error) => {

            console.error(
                "Prediction WebSocket error:",
                error
            );
        };


        return () => {

            socket.close();

        };

    }, []);


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


                <div className="model-selector">

                    <button
                        type="button"
                        className={
                            selectedModel === "Chronos-2"
                                ? "model-button active"
                                : "model-button"
                        }
                        onClick={() =>
                            setSelectedModel(
                                "Chronos-2"
                            )
                        }
                    >
                        Chronos-2
                    </button>


                    <button
                        type="button"
                        className={
                            selectedModel === "TimesFM"
                                ? "model-button active"
                                : "model-button"
                        }
                        onClick={() =>
                            setSelectedModel(
                                "TimesFM"
                            )
                        }
                    >
                        TimesFM
                    </button>

                </div>

            </div>


            <div className="prediction-content">

                <div className="prediction-icon">
                    ✦
                </div>


                <h3>
                    BTC Prediction
                </h3>


                <div className="prediction-model">

                    <span>
                        Model:
                    </span>

                    <strong>
                        {selectedModel}
                    </strong>

                </div>


                <div className="prediction-status">

                    <span className="status-dot connected" />

                    <span>
                        Connected
                    </span>

                </div>


                <div className="signal-card">

                    <span className="signal-label">
                        Signal
                    </span>


                    <div className="signal-value">

                        <span className="signal-arrow">
                            ▲
                        </span>

                        BULLISH

                    </div>


                    <div className="confidence">

                        <span>
                            Confidence
                        </span>

                        <strong>
                            78.4%
                        </strong>

                    </div>

                </div>


                <div className="forecast-value">

                    <span>
                        Prediction
                    </span>

                    <strong>
                        $118,420
                    </strong>

                </div>


                <div className="forecast-grid">

                    {/* =====================================
                        CURRENT PRICE
                    ===================================== */}

                    <div className="forecast-item">

                        <span>
                            Current Price
                        </span>

                        <strong>

                            {currentPrice !== null
                                ? `$${currentPrice.toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                )}`
                                : "—"
                            }

                        </strong>

                    </div>


                    <div className="forecast-item">

                        <span>
                            Expected Change
                        </span>

                        <strong className="positive">
                            +0.47%
                        </strong>

                    </div>


                    <div className="forecast-item">

                        <span>
                            Forecast Horizon
                        </span>

                        <strong>
                            15 min
                        </strong>

                    </div>


                    <div className="forecast-item">

                        <span>
                            Updated
                        </span>

                        <strong>
                            10s ago
                        </strong>

                    </div>

                </div>

            </div>

        </section>
    );
}


export default PredictionPanel;