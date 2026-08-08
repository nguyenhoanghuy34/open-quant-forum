import { useEffect, useRef } from "react";

import {
    createChart,
    CandlestickSeries,
    HistogramSeries,
} from "lightweight-charts";


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


        candleSeriesRef.current =
            candleSeries;

        volumeSeriesRef.current =
            volumeSeries;

        chartRef.current =
            chart;


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


                /*
                 * ========================
                 * HISTORICAL DATA
                 * ========================
                 */

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


                        candles.push({

                            time,

                            open:
                                Number(
                                    item.open
                                ),

                            high:
                                Number(
                                    item.high
                                ),

                            low:
                                Number(
                                    item.low
                                ),

                            close:
                                Number(
                                    item.close
                                ),
                        });


                        volumes.push({

                            time,

                            value:
                                Number(
                                    item.volume
                                ),

                            color:
                                Number(
                                    item.close
                                ) >=
                                Number(
                                    item.open
                                )
                                    ? "rgba(34,197,94,0.35)"
                                    : "rgba(239,68,68,0.35)",
                        });
                    }


                    candleSeries.setData(
                        candles
                    );


                    volumeSeries.setData(
                        volumes
                    );


                    console.log(
                        "Loaded candles:",
                        candles.length
                    );


                    /*
                     * Show latest 60 candles
                     */

                    if (
                        candles.length > 0
                    ) {

                        const last =
                            candles.length -
                            1;


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


                /*
                 * ========================
                 * REALTIME CANDLE
                 * ========================
                 */

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


                    /*
                     * Validate Binance data
                     */

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


                    /*
                     * UPDATE CANDLE
                     */

                    candleSeries.update({

                        time,

                        open,

                        high,

                        low,

                        close,
                    });


                    /*
                     * UPDATE VOLUME
                     */

                    volumeSeries.update({

                        time,

                        value:
                            volume,

                        color:
                            close >= open
                                ? "rgba(34,197,94,0.35)"
                                : "rgba(239,68,68,0.35)",
                    });


                    console.log(
                        "Realtime candle:",
                        {
                            time,
                            open,
                            high,
                            low,
                            close,
                            volume,
                        }
                    );
                }

            } catch (error) {

                console.error(
                    "WebSocket message error:",
                    error
                );
            }
        };


        socket.onerror = (
            error
        ) => {

            console.error(
                "WebSocket error:",
                error
            );
        };


        socket.onclose = () => {

            console.log(
                "Market WebSocket disconnected"
            );
        };


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


        return () => {

            resizeObserver.disconnect();

            socket.close();

            chart.remove();
        };

    }, []);


    return (
        <div
            ref={containerRef}
            className="candlestick-chart"
        />
    );
}


export default CandlestickChart;