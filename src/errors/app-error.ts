export class AppError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
  }
}

export class FileReadError extends AppError {
  constructor(message: string) {
    super(message, 'FILE_READ_ERROR');
  }
}

export class ShapeCreationError extends AppError {
  constructor(message: string) {
    super(message, 'SHAPE_CREATION_ERROR');
  }
}

export class CalculationError extends AppError {
  constructor(message: string) {
    super(message, 'CALCULATION_ERROR');
  }
}
