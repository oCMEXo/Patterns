"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationValidator = void 0;
const app_error_1 = require("../errors/app-error");
class CalculationValidator {
    static validatePositive(value, name) {
        if (!Number.isFinite(value) || value <= 0) {
            throw new app_error_1.CalculationError(`Calculated ${name} must be positive, got ${value}`);
        }
    }
    static validateNonNegative(value, name) {
        if (!Number.isFinite(value) || value < 0) {
            throw new app_error_1.CalculationError(`Calculated ${name} must be non-negative, got ${value}`);
        }
    }
}
exports.CalculationValidator = CalculationValidator;
