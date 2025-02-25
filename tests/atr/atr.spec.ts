import { ATR } from '../../src/atr';
import { ATR as ATR2 } from 'technicalindicators';
import { atrValues, ohlc } from './excel-data';

describe('ATR', () => {
    it('Excel Validate', () => {
        const period = 14;
        const atr = new ATR(period, 'SMA');

        ohlc.forEach((tick, idx) => {
            const calculated = atr.nextValue(tick.h, tick.l, tick.c);
            const excel = atrValues[idx];

            if (idx > period) {
                expect(Math.abs(calculated - excel)).toBeLessThan(0.007);
            }
        });
    });

    it.skip('Cross sdk validate', () => {
        const period = 14;
        const atr = new ATR(period, 'SMMA');
        const atr2 = new ATR2({ period, high: [], low: [], close: [] });

        ohlc.forEach((tick, idx) => {
            const local = atr.nextValue(tick.h, tick.l, tick.c);
            const cross = atr2.nextValue({ high: tick.h, low: tick.l, close: tick.c });

            // FIX: cross === undefioned at 14 pos, local is fine?
            if (idx > period) {
                // console.log(local, cross);
                expect(local).toEqual(cross);
            }
        });
    });
});
