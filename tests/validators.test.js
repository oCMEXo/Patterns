import { LineValidator } from '../src/validators/line-validator';
describe('LineValidator', () => {
    it('accepts correct line', () => {
        const line = 't1 0 0 0  1 0 0  0 1 0  0 0 1';
        expect(() => LineValidator.validateLine(line)).not.toThrow();
    });
    it('rejects line with non-numeric token', () => {
        const line = 't1 0 0 a  1 0 0  0 1 0  0 0 1';
        expect(() => LineValidator.validateLine(line)).toThrow();
    });
    it('rejects line with wrong number of values', () => {
        const line = 't1 0 0 0  1 0 0  0 1 0';
        expect(() => LineValidator.validateLine(line)).toThrow();
    });
});
