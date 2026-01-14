import { FLOAT_NUMBER_REGEX } from '../constants/regex';
import { ValidationError } from '../errors/app-error';

export class LineValidator {
  public static validateLine(line: string): void {
    if (!line.trim()) {
      throw new ValidationError('Empty line');
    }

    const parts: string[] = line.trim().split(/\s+/);
    if (parts.length !== 13) {
      throw new ValidationError(`Expected 13 values in line, got ${parts.length}`);
    }

    for (let i = 1; i < parts.length; i += 1) {
      const token = parts[i];
      const isMatch = FLOAT_NUMBER_REGEX.test(token);
      if (!isMatch) {
        throw new ValidationError(`Invalid number token: "${token}"`);
      }
    }
  }
}
