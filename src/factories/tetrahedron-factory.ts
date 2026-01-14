import { Point } from '../entities/point';
import { Tetrahedron } from '../entities/tetrahedron';
import { ShapeCreationError } from '../errors/app-error';
import { LineValidator } from '../validators/line-validator';

export class TetrahedronFactory {
  public static createFromLine(line: string): Tetrahedron {
    try {
      LineValidator.validateLine(line);
    } catch (error) {
      if (error instanceof ShapeCreationError) {
        throw error;
      }
      throw new ShapeCreationError(`Invalid line for Tetrahedron: ${(error as Error).message}`);
    }

    const parts = line.trim().split(/\s+/);
    const id = parts[0];

    const coords: number[] = [];
    for (let i = 1; i < parts.length; i += 1) {
      const value = Number(parts[i]);
      coords.push(value);
    }

    const points: Point[] = [];
    for (let i = 0; i < 12; i += 3) {
      const x = coords[i];
      const y = coords[i + 1];
      const z = coords[i + 2];
      const point = new Point(x, y, z);
      points.push(point);
    }

    const tetrahedron = new Tetrahedron(id, points);
    return tetrahedron;
  }
}
