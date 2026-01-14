"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationError = exports.ShapeCreationError = exports.FileReadError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message) {
        super(message, 'VALIDATION_ERROR');
    }
}
exports.ValidationError = ValidationError;
class FileReadError extends AppError {
    constructor(message) {
        super(message, 'FILE_READ_ERROR');
    }
}
exports.FileReadError = FileReadError;
class ShapeCreationError extends AppError {
    constructor(message) {
        super(message, 'SHAPE_CREATION_ERROR');
    }
}
exports.ShapeCreationError = ShapeCreationError;
class CalculationError extends AppError {
    constructor(message) {
        super(message, 'CALCULATION_ERROR');
    }
}
exports.CalculationError = CalculationError;
