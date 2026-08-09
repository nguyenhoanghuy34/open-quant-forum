export function calculateEMA(
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

    const multiplier =
        2 / (period + 1);

    // Initial EMA = SMA
    let sum = 0;

    for (
        let i = 0;
        i < period;
        i++
    ) {
        sum += Number(
            candles[i].close
        );
    }

    let ema =
        sum / period;

    result.push({
        time: candles[period - 1].time,
        value: ema,
    });

    // Continue EMA calculation
    for (
        let i = period;
        i < candles.length;
        i++
    ) {
        const close =
            Number(
                candles[i].close
            );

        if (
            !Number.isFinite(close)
        ) {
            continue;
        }

        ema =
            (close - ema) *
            multiplier +
            ema;

        result.push({
            time: candles[i].time,
            value: ema,
        });
    }

    return result;
}