import { useEffect, useRef, useState } from "react";

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

    // =====================================================
    // INDICATOR VISIBILITY
    // =====================================================

    const [showSMA, setShowSMA] =
        useState(true);

    const [showEMA, setShowEMA] =
        useState(true);


    // =====================================================
    // REFS
    // =====================================================

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


    // =====================================================
    // CREATE CHART
    // =====================================================

    useEffect(() => {

        const container =
            containerRef.current;

        if (!container) {
            return;
        }


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
        // SAVE REFERENCES
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
                    // CREATE SMA
                    // =================================================

                    smaSeriesRef.current =
                        createSMA(
                            chart,
                            candles,
                            20
                        );


                    // =================================================
                    // CREATE EMA
                    // =================================================

                    emaSeriesRef.current =
                        createEMA(
                            chart,
                            candles,
                            20
                        );


                    // =================================================
                    // INITIAL VISIBILITY
                    // =================================================

                    smaSeriesRef.current.applyOptions({
                        visible: true,
                    });

                    emaSeriesRef.current.applyOptions({
                        visible: true,
                    });


                    // =================================================
                    // SHOW LATEST 60
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
                    // UPDATE LOCAL BUFFER
                    // =================================================

                    const candles =
                        candlesRef.current;


                    const lastIndex =
                        candles.length - 1;


                    const lastCandle =
                        candles[lastIndex];


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

                    } else if (
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
                    // UPDATE SMA
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
                    // UPDATE EMA
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


    // =====================================================
    // TOGGLE SMA
    // =====================================================

    const toggleSMA = () => {

        setShowSMA(
            (previous) => {

                const next =
                    !previous;

                if (
                    smaSeriesRef.current
                ) {

                    smaSeriesRef.current.applyOptions({
                        visible: next,
                    });
                }

                return next;
            }
        );
    };


    // =====================================================
    // TOGGLE EMA
    // =====================================================

    const toggleEMA = () => {

        setShowEMA(
            (previous) => {

                const next =
                    !previous;

                if (
                    emaSeriesRef.current
                ) {

                    emaSeriesRef.current.applyOptions({
                        visible: next,
                    });
                }

                return next;
            }
        );
    };


    return (

        <div
            ref={containerRef}
            className="candlestick-chart"
            style={{
                position: "relative",
            }}
        >

            {/* =================================================
                INDICATOR CONTROLS
            ================================================= */}

            <div
                style={{
                    position: "absolute",

                    top: "12px",

                    left: "12px",

                    zIndex: 10,

                    display: "flex",

                    alignItems: "center",

                    gap: "6px",

                    padding: "4px",

                    borderRadius: "9px",

                    background:
                        "rgba(9,9,11,0.72)",

                    backdropFilter:
                        "blur(10px)",

                    WebkitBackdropFilter:
                        "blur(10px)",

                    border:
                        "1px solid rgba(255,255,255,0.08)",
                }}
            >

                {/* =================================================
                    SMA BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={toggleSMA}
                    style={{
                        display: "flex",

                        alignItems: "center",

                        gap: "6px",

                        padding:
                            "6px 9px",

                        border: "none",

                        borderRadius: "6px",

                        background:
                            showSMA
                                ? "rgba(59,130,246,0.16)"
                                : "transparent",

                        color:
                            showSMA
                                ? "#ffffff"
                                : "#71717a",

                        cursor: "pointer",

                        fontSize: "12px",

                        fontWeight: 500,

                        transition:
                            "all 0.15s ease",
                    }}
                >

                    <span
                        style={{
                            width: "18px",

                            height: "2px",

                            background:
                                "#3b82f6",

                            display:
                                "inline-block",

                            borderRadius:
                                "2px",

                            opacity:
                                showSMA
                                    ? 1
                                    : 0.35,
                        }}
                    />

                    SMA 20

                </button>


                {/* =================================================
                    EMA BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={toggleEMA}
                    style={{
                        display: "flex",

                        alignItems: "center",

                        gap: "6px",

                        padding:
                            "6px 9px",

                        border: "none",

                        borderRadius: "6px",

                        background:
                            showEMA
                                ? "rgba(245,158,11,0.16)"
                                : "transparent",

                        color:
                            showEMA
                                ? "#ffffff"
                                : "#71717a",

                        cursor: "pointer",

                        fontSize: "12px",

                        fontWeight: 500,

                        transition:
                            "all 0.15s ease",
                    }}
                >

                    <span
                        style={{
                            width: "18px",

                            height: "2px",

                            background:
                                "#f59e0b",

                            display:
                                "inline-block",

                            borderRadius:
                                "2px",

                            opacity:
                                showEMA
                                    ? 1
                                    : 0.35,
                        }}
                    />

                    EMA 20

                </button>

            </div>

        </div>
    );
}


export default CandlestickChart;