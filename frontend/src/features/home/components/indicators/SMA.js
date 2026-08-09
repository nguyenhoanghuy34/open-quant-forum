import { LineSeries } from "lightweight-charts";

import {
    calculateSMA,
} from "./smaCalculator";


export function createSMA(
    chart,
    candles,
    period = 20
) {
    const smaSeries =
        chart.addSeries(
            LineSeries,
            {
                lineWidth: 2,

                lastValueVisible: false,

                priceLineVisible: false,

                crosshairMarkerVisible: false,
            }
        );

    const data =
        calculateSMA(
            candles,
            period
        );

    if (data.length > 0) {
        smaSeries.setData(data);
    }

    return smaSeries;
}


export function updateSMA(
    smaSeries,
    candles,
    period = 20
) {
    if (!smaSeries) {
        return;
    }

    const data =
        calculateSMA(
            candles,
            period
        );

    if (data.length > 0) {
        smaSeries.setData(data);
    }
}