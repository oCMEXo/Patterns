import { CalculationError } from '../errors/app-error';

export class CalculationValidator {
  public static validatePositive(value: number, name: string): void {
    if (!Number.isFinite(value) || value <= 0) {
      throw new CalculationError(`Calculated ${name} must be positive, got ${value}`);
    }
  }

  public static validateNonNegative(value: number, name: string): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new CalculationError(`Calculated ${name} must be non-negative, got ${value}`);
    }
  }
}
