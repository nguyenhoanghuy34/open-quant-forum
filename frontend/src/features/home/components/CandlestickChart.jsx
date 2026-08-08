import { useEffect, useRef } from "react";

import {
    createChart,
    CandlestickSeries,
    HistogramSeries,
} from "lightweight-charts";


const API_WS_URL =
    "ws://127.0.0.1:8000/api/market-data/ws";


function CandlestickChart() {

    const chartContainerRef = useRef(null);

    const chartRef = useRef(null);

    const candleSeriesRef = useRef(null);

    const volumeSeriesRef = useRef(null);


    useEffect(() => {

        const container =
            chartContainerRef.current;

        if (!container) {
            return;
        }


        const chart = createChart(
            container,
            {
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

                    scaleMargins: {
                        top: 0.08,
                        bottom: 0.25,
                    },
                },

                timeScale: {
                    borderColor:
                        "rgba(255,255,255,0.08)",

                    timeVisible: true,

                    secondsVisible: false,

                    rightOffset: 5,

                    barSpacing: 8,

                    minBarSpacing: 2,

                    fixLeftEdge: false,

                    fixRightEdge: false,
                },

                crosshair: {
                    mode: 1,
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
                },

                width: container.clientWidth,

                height: 500,
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
                }
            );


        const volumeSeries =
            chart.addSeries(
                HistogramSeries,
                {
                    priceFormat: {
                        type: "volume",
                    },

                    priceScaleId: "volume",
                }
            );


        volumeSeries.priceScale()
            .applyOptions({
                scaleMargins: {
                    top: 0.80,
                    bottom: 0,
                },
            });


        chartRef.current = chart;

        candleSeriesRef.current =
            candleSeries;

        volumeSeriesRef.current =
            volumeSeries;


        const socket =
            new WebSocket(API_WS_URL);


        socket.onopen = () => {

            console.log(
                "Market WebSocket connected"
            );

        };


        socket.onmessage = (event) => {

            const message =
                JSON.parse(event.data);


            /*
             * Initial 300 candles
             */
            if (
                message.type === "snapshot"
            ) {

                const candles =
                    message.data.map(
                        (candle) => {

                            const time =
                                Math.floor(
                                    new Date(
                                        candle.open_time
                                    ).getTime() / 1000
                                );


                            return {
                                time,

                                open:
                                    candle.open,

                                high:
                                    candle.high,

                                low:
                                    candle.low,

                                close:
                                    candle.close,
                            };
                        }
                    );


                const volumes =
                    message.data.map(
                        (candle) => {

                            const time =
                                Math.floor(
                                    new Date(
                                        candle.open_time
                                    ).getTime() / 1000
                                );


                            return {
                                time,

                                value:
                                    candle.volume,

                                color:
                                    candle.close >=
                                    candle.open
                                        ? "rgba(34,197,94,0.35)"
                                        : "rgba(239,68,68,0.35)",
                            };
                        }
                    );


                candleSeries.setData(
                    candles
                );


                volumeSeries.setData(
                    volumes
                );


                /*
                 * IMPORTANT:
                 *
                 * Do NOT fit all 300 candles.
                 *
                 * Initially show roughly
                 * the latest 70 candles.
                 */
                if (candles.length > 0) {

                    const latestIndex =
                        candles.length - 1;

                    const firstVisible =
                        Math.max(
                            0,
                            latestIndex - 70
                        );


                    chart.timeScale()
                        .setVisibleLogicalRange({
                            from:
                                firstVisible,

                            to:
                                latestIndex + 5,
                        });
                }


                return;
            }


            /*
             * Realtime candle update
             */
            if (
                message.type === "candle"
            ) {

                const candle =
                    message.data;


                const time =
                    Math.floor(
                        new Date(
                            candle.open_time
                        ).getTime() / 1000
                    );


                candleSeries.update({
                    time,

                    open:
                        candle.open,

                    high:
                        candle.high,

                    low:
                        candle.low,

                    close:
                        candle.close,
                });


                volumeSeries.update({
                    time,

                    value:
                        candle.volume,

                    color:
                        candle.close >=
                        candle.open
                            ? "rgba(34,197,94,0.35)"
                            : "rgba(239,68,68,0.35)",
                });

            }

        };


        socket.onerror = (error) => {

            console.error(
                "Market WebSocket error:",
                error
            );

        };


        socket.onclose = () => {

            console.log(
                "Market WebSocket disconnected"
            );

        };


        const handleResize = () => {

            if (!chartContainerRef.current) {
                return;
            }


            chart.applyOptions({
                width:
                    chartContainerRef
                        .current
                        .clientWidth,
            });

        };


        window.addEventListener(
            "resize",
            handleResize
        );


        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );


            socket.close();

            chart.remove();

        };

    }, []);


    return (
        <div
            ref={chartContainerRef}
            className="candlestick-chart"
        />
    );
}


export default CandlestickChart;