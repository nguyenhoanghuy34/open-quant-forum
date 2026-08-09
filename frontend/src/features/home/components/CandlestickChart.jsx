import { useEffect, useRef } from "react";

import {
    createChart,
    CandlestickSeries,
    HistogramSeries,
} from "lightweight-charts";

import {
    createSMA,
    updateSMA,
} from "./indicators/SMA";

import {
    createEMA,
    updateEMA,
} from "./indicators/EMA";


const API_WS_URL =
    "ws://127.0.0.1:8000/api/market-data/ws";


function CandlestickChart() {

    const containerRef =
        useRef(null);

    const chartRef =
        useRef(null);

    const candleSeriesRef =
        useRef(null);

    const volumeSeriesRef =
        useRef(null);

    const smaSeriesRef =
        useRef(null);

    const emaSeriesRef =
        useRef(null);

    const candlesRef =
        useRef([]);


    useEffect(() => {

        const container =
            containerRef.current;

        if (!container) {
            return;
        }


        // =====================================================
        // CREATE CHART
        // =====================================================

        const chart = createChart(
            container,
            {
                width:
                    container.clientWidth,

                height: 500,

                layout: {
                    background: {
                        color: "transparent",
                    },

                    textColor: "#71717a",
                },

                grid: {
                    vertLines: {
                        color:
                            "rgba(255,255,255,0.04)",
                    },

                    horzLines: {
                        color:
                            "rgba(255,255,255,0.04)",
                    },
                },

                rightPriceScale: {
                    borderColor:
                        "rgba(255,255,255,0.08)",
                },

                timeScale: {
                    borderColor:
                        "rgba(255,255,255,0.08)",

                    timeVisible: true,

                    secondsVisible: false,

                    rightOffset: 8,

                    barSpacing: 10,

                    minBarSpacing: 1,

                    fixLeftEdge: false,

                    fixRightEdge: false,
                },

                handleScroll: {
                    mouseWheel: true,

                    pressedMouseMove: true,

                    horzTouchDrag: true,

                    vertTouchDrag: false,
                },

                handleScale: {
                    mouseWheel: true,

                    pinch: true,

                    axisPressedMouseMove: true,

                    axisDoubleClickReset: true,
                },

                crosshair: {
                    mode: 0,
                },
            }
        );


        // =====================================================
        // CANDLESTICK
        // =====================================================

        const candleSeries =
            chart.addSeries(
                CandlestickSeries,
                {
                    upColor: "#22c55e",

                    downColor: "#ef4444",

                    borderUpColor: "#22c55e",

                    borderDownColor: "#ef4444",

                    wickUpColor: "#22c55e",

                    wickDownColor: "#ef4444",

                    lastValueVisible: true,

                    priceLineVisible: true,
                }
            );


        // =====================================================
        // VOLUME
        // =====================================================

        const volumeSeries =
            chart.addSeries(
                HistogramSeries,
                {
                    priceFormat: {
                        type: "volume",
                    },

                    priceScaleId: "",
                }
            );


        volumeSeries
            .priceScale()
            .applyOptions({
                scaleMargins: {
                    top: 0.80,

                    bottom: 0,
                },
            });


        // =====================================================
        // REFERENCES
        // =====================================================

        candleSeriesRef.current =
            candleSeries;

        volumeSeriesRef.current =
            volumeSeries;

        chartRef.current =
            chart;


        // =====================================================
        // WEBSOCKET
        // =====================================================

        const socket =
            new WebSocket(
                API_WS_URL
            );


        socket.onopen = () => {

            console.log(
                "Market WebSocket connected"
            );
        };


        socket.onmessage = (event) => {

            try {

                const message =
                    JSON.parse(
                        event.data
                    );


                // =================================================
                // HISTORICAL SNAPSHOT
                // =================================================

                if (
                    message.type ===
                    "snapshot"
                ) {

                    const candles = [];

                    const volumes = [];


                    for (
                        const item
                        of message.data
                    ) {

                        const time =
                            Math.floor(
                                new Date(
                                    item.open_time
                                ).getTime() /
                                1000
                            );


                        if (
                            !Number.isFinite(
                                time
                            )
                        ) {

                            continue;
                        }


                        const open =
                            Number(
                                item.open
                            );

                        const high =
                            Number(
                                item.high
                            );

                        const low =
                            Number(
                                item.low
                            );

                        const close =
                            Number(
                                item.close
                            );

                        const volume =
                            Number(
                                item.volume
                            );


                        if (
                            !Number.isFinite(
                                open
                            ) ||
                            !Number.isFinite(
                                high
                            ) ||
                            !Number.isFinite(
                                low
                            ) ||
                            !Number.isFinite(
                                close
                            ) ||
                            !Number.isFinite(
                                volume
                            )
                        ) {

                            continue;
                        }


                        candles.push({

                            time,

                            open,

                            high,

                            low,

                            close,
                        });


                        volumes.push({

                            time,

                            value:
                                volume,

                            color:
                                close >= open
                                    ? "rgba(34,197,94,0.35)"
                                    : "rgba(239,68,68,0.35)",
                        });
                    }


                    // =================================================
                    // SAVE DATA
                    // =================================================

                    candlesRef.current =
                        candles;


                    // =================================================
                    // DRAW CANDLES
                    // =================================================

                    candleSeries.setData(
                        candles
                    );


                    // =================================================
                    // DRAW VOLUME
                    // =================================================

                    volumeSeries.setData(
                        volumes
                    );


                    // =================================================
                    // SMA 20
                    // =================================================

                    smaSeriesRef.current =
                        createSMA(
                            chart,
                            candlesRef.current,
                            20
                        );


                    // =================================================
                    // EMA 20
                    // =================================================

                    emaSeriesRef.current =
                        createEMA(
                            chart,
                            candlesRef.current,
                            20
                        );


                    console.log(
                        "Loaded candles:",
                        candles.length
                    );


                    // =================================================
                    // SHOW LATEST CANDLES
                    // =================================================

                    if (
                        candles.length > 0
                    ) {

                        const last =
                            candles.length - 1;


                        chart
                            .timeScale()
                            .setVisibleLogicalRange({
                                from:
                                    Math.max(
                                        0,
                                        last - 60
                                    ),

                                to:
                                    last + 5,
                            });
                    }


                    return;
                }


                // =================================================
                // REALTIME CANDLE
                // =================================================

                if (
                    message.type ===
                    "candle"
                ) {

                    const item =
                        message.data;


                    const time =
                        Math.floor(
                            new Date(
                                item.open_time
                            ).getTime() /
                            1000
                        );


                    const open =
                        Number(
                            item.open
                        );

                    const high =
                        Number(
                            item.high
                        );

                    const low =
                        Number(
                            item.low
                        );

                    const close =
                        Number(
                            item.close
                        );

                    const volume =
                        Number(
                            item.volume
                        );


                    // =================================================
                    // VALIDATE
                    // =================================================

                    if (
                        !Number.isFinite(
                            time
                        ) ||
                        !Number.isFinite(
                            open
                        ) ||
                        !Number.isFinite(
                            high
                        ) ||
                        !Number.isFinite(
                            low
                        ) ||
                        !Number.isFinite(
                            close
                        ) ||
                        !Number.isFinite(
                            volume
                        )
                    ) {

                        console.warn(
                            "Invalid candle:",
                            item
                        );

                        return;
                    }


                    // =================================================
                    // UPDATE CANDLE
                    // =================================================

                    candleSeries.update({

                        time,

                        open,

                        high,

                        low,

                        close,
                    });


                    // =================================================
                    // UPDATE VOLUME
                    // =================================================

                    volumeSeries.update({

                        time,

                        value:
                            volume,

                        color:
                            close >= open
                                ? "rgba(34,197,94,0.35)"
                                : "rgba(239,68,68,0.35)",
                    });


                    // =================================================
                    // UPDATE LOCAL DATA
                    // =================================================

                    const candles =
                        candlesRef.current;


                    const lastIndex =
                        candles.length - 1;


                    const lastCandle =
                        candles[lastIndex];


                    // =================================================
                    // CURRENT CANDLE
                    // =================================================

                    if (
                        lastCandle &&
                        lastCandle.time === time
                    ) {

                        candles[lastIndex] = {

                            time,

                            open,

                            high,

                            low,

                            close,
                        };
                    }


                    // =================================================
                    // NEW CANDLE
                    // =================================================

                    else if (
                        !lastCandle ||
                        time >
                            lastCandle.time
                    ) {

                        candles.push({

                            time,

                            open,

                            high,

                            low,

                            close,
                        });
                    }


                    // =================================================
                    // LIMIT BUFFER
                    // =================================================

                    if (
                        candles.length > 1000
                    ) {

                        candles.shift();
                    }


                    // =================================================
                    // UPDATE SMA20
                    // =================================================

                    if (
                        smaSeriesRef.current
                    ) {

                        updateSMA(
                            smaSeriesRef.current,
                            candles,
                            20
                        );
                    }


                    // =================================================
                    // UPDATE EMA20
                    // =================================================

                    if (
                        emaSeriesRef.current
                    ) {

                        updateEMA(
                            emaSeriesRef.current,
                            candles,
                            20
                        );
                    }
                }

            } catch (error) {

                console.error(
                    "WebSocket message error:",
                    error
                );
            }
        };


        // =====================================================
        // WEBSOCKET ERROR
        // =====================================================

        socket.onerror = (
            error
        ) => {

            console.error(
                "WebSocket error:",
                error
            );
        };


        // =====================================================
        // WEBSOCKET CLOSE
        // =====================================================

        socket.onclose = () => {

            console.log(
                "Market WebSocket disconnected"
            );
        };


        // =====================================================
        // RESPONSIVE
        // =====================================================

        const resizeObserver =
            new ResizeObserver(() => {

                if (
                    !containerRef.current
                ) {

                    return;
                }


                chart.applyOptions({

                    width:
                        containerRef
                            .current
                            .clientWidth,
                });
            });


        resizeObserver.observe(
            container
        );


        // =====================================================
        // CLEANUP
        // =====================================================

        return () => {

            resizeObserver.disconnect();

            socket.close();

            chart.remove();

            candlesRef.current = [];

            smaSeriesRef.current = null;

            emaSeriesRef.current = null;

            candleSeriesRef.current = null;

            volumeSeriesRef.current = null;

            chartRef.current = null;
        };

    }, []);


    return (
        <div
            ref={containerRef}
            className="candlestick-chart"
            style={{
                position: "relative",
            }}
        >

            {/* =========================================
                INDICATOR LEGEND
            ========================================= */}

            <div
                style={{
                    position: "absolute",

                    top: "12px",

                    left: "12px",

                    zIndex: 10,

                    display: "flex",

                    alignItems: "center",

                    gap: "14px",

                    padding: "7px 10px",

                    borderRadius: "8px",

                    background:
                        "rgba(9,9,11,0.72)",

                    backdropFilter:
                        "blur(10px)",

                    WebkitBackdropFilter:
                        "blur(10px)",

                    border:
                        "1px solid rgba(255,255,255,0.08)",

                    fontSize: "12px",

                    color: "#a1a1aa",

                    pointerEvents: "none",
                }}
            >

                {/* SMA 20 */}

                <div
                    style={{
                        display: "flex",

                        alignItems: "center",

                        gap: "6px",
                    }}
                >

                    <span
                        style={{
                            width: "18px",

                            height: "2px",

                            background:
                                "#3b82f6",

                            display: "inline-block",

                            borderRadius: "2px",
                        }}
                    />

                    <span>
                        SMA 20
                    </span>

                </div>


                {/* EMA 20 */}

                <div
                    style={{
                        display: "flex",

                        alignItems: "center",

                        gap: "6px",
                    }}
                >

                    <span
                        style={{
                            width: "18px",

                            height: "2px",

                            background:
                                "#f59e0b",

                            display: "inline-block",

                            borderRadius: "2px",
                        }}
                    />

                    <span>
                        EMA 20
                    </span>

                </div>

            </div>

        </div>
    );
}


export default CandlestickChart;