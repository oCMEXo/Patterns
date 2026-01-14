import { Point } from './point';
import { Shape } from './shape';
import { ValidationError } from '../errors/app-error';

export class Tetrahedron extends Shape {
  constructor(id: string, points: Point[]) {
    super(id, 'Tetrahedron', points);
  }

  public updatePoint(index: number, point: Point): void {
    if (index < 0 || index >= this.points.length) {
      throw new ValidationError('Point index out of range');
    }
    this.points[index] = point;
    this.notifyObservers();
  }
}
