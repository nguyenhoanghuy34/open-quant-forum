import { useState } from "react";

import CandlestickChart from "./CandlestickChart";


const TIMEFRAMES = [
    "1m",
    "5m",
    "10m",
    "15m",
    "30m",
    "1h",
    "4h",
    "1D",
];


function ChartPanel() {

    const [
        activeTimeframe,
        setActiveTimeframe,
    ] = useState("5m");


    const isAvailable =
        activeTimeframe === "5m";


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


                <div className="timeframe-nav">

                    {TIMEFRAMES.map(
                        (timeframe) => (

                            <button
                                key={timeframe}
                                type="button"
                                className={
                                    activeTimeframe === timeframe
                                        ? "timeframe-button active"
                                        : "timeframe-button"
                                }
                                onClick={() =>
                                    setActiveTimeframe(
                                        timeframe
                                    )
                                }
                            >
                                {timeframe}
                            </button>

                        )
                    )}

                </div>

            </div>


            <div className="chart-placeholder">

                {isAvailable ? (

                    <CandlestickChart />

                ) : (

                    <div className="chart-coming-soon">

                        <div className="chart-coming-icon">
                            ◇
                        </div>

                        <h3>
                            {activeTimeframe} Candlestick Chart
                        </h3>

                        <p>
                            {activeTimeframe} candle data
                            is not available yet.
                        </p>

                        <span>
                            Coming soon
                        </span>

                    </div>

                )}

            </div>

        </section>
    );
}


export default ChartPanel;