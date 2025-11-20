import { Point } from './point';
import { Shape } from './shape';

export class Tetrahedron extends Shape {
  constructor(id: string, points: Point[]) {
    super(id, 'Tetrahedron', points);
  }
}
