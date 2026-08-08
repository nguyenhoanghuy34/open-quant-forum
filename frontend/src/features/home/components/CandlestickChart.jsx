import {
    useEffect,
    useRef,
} from "react";

import {
    createChart,
    CandlestickSeries,
} from "lightweight-charts";


function CandlestickChart() {

    const chartContainerRef =
        useRef(null);


    useEffect(() => {

        if (!chartContainerRef.current) {
            return;
        }


        const chart =
            createChart(
                chartContainerRef.current,
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
                    },

                    timeScale: {
                        borderColor:
                            "rgba(255,255,255,0.08)",

                        timeVisible: true,

                        secondsVisible: false,
                    },

                    width:
                        chartContainerRef
                            .current
                            .clientWidth,

                    height: 500,
                }
            );


        const candleSeries =
            chart.addSeries(
                CandlestickSeries,
                {
                    upColor: "#22c55e",

                    downColor: "#ef4444",

                    borderVisible: false,

                    wickUpColor: "#22c55e",

                    wickDownColor: "#ef4444",
                }
            );


        // Temporary mock data
        candleSeries.setData([
            {
                time: 1754650800,
                open: 116000,
                high: 116250,
                low: 115900,
                close: 116180,
            },

            {
                time: 1754651100,
                open: 116180,
                high: 116400,
                low: 116050,
                close: 116320,
            },

            {
                time: 1754651400,
                open: 116320,
                high: 116500,
                low: 116100,
                close: 116220,
            },

            {
                time: 1754651700,
                open: 116220,
                high: 116300,
                low: 115950,
                close: 116040,
            },

            {
                time: 1754652000,
                open: 116040,
                high: 116350,
                low: 115980,
                close: 116280,
            },
        ]);


        chart.timeScale().fitContent();


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