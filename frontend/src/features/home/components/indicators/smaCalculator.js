export function calculateSMA(
    candles,
    period = 20
) {
    if (
        !Array.isArray(candles) ||
        candles.length < period
    ) {
        return [];
    }

    const result = [];

    let sum = 0;

    for (let i = 0; i < candles.length; i++) {

        const close =
            Number(candles[i].close);

        if (!Number.isFinite(close)) {
            continue;
        }

        sum += close;

        if (i >= period) {
            sum -= Number(
                candles[i - period].close
            );
        }

        if (i >= period - 1) {
            result.push({
                time: candles[i].time,
                value: sum / period,
            });
        }
    }

    return result;
}