import { LineSeries } from "lightweight-charts";

import {
    calculateEMA,
} from "./emaCalculator";


export function createEMA(
    chart,
    candles,
    period = 20
) {
    const emaSeries =
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
        calculateEMA(
            candles,
            period
        );

    if (data.length > 0) {
        emaSeries.setData(data);
    }

    return emaSeries;
}


export function updateEMA(
    emaSeries,
    candles,
    period = 20
) {
    if (!emaSeries) {
        return;
    }

    const data =
        calculateEMA(
            candles,
            period
        );

    if (data.length > 0) {
        emaSeries.setData(data);
    }
}