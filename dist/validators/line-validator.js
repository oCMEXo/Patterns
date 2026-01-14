"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineValidator = void 0;
const regex_1 = require("../constants/regex");
const app_error_1 = require("../errors/app-error");
class LineValidator {
    static validateLine(line) {
        if (!line.trim()) {
            throw new app_error_1.ValidationError('Empty line');
        }
        const parts = line.trim().split(/\s+/);
        if (parts.length !== 13) {
            throw new app_error_1.ValidationError(`Expected 13 values in line, got ${parts.length}`);
        }
        for (let i = 1; i < parts.length; i += 1) {
            const token = parts[i];
            const isMatch = regex_1.FLOAT_NUMBER_REGEX.test(token);
            if (!isMatch) {
                throw new app_error_1.ValidationError(`Invalid number token: "${token}"`);
            }
        }
    }
}
exports.LineValidator = LineValidator;
