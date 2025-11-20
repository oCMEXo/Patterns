import { Tetrahedron } from '../entities/tetrahedron';
import { Point } from '../entities/point';
import { ValidationError } from '../errors/app-error';

export class TetrahedronValidator {
  public static validateTetrahedron(t: Tetrahedron): void {
    const points = t.getPoints();
    if (points.length !== 4) {
      throw new ValidationError('Tetrahedron must have exactly 4 points');
    }

    const [a, b, c, d] = points;
    const volume6 = Math.abs(this.computeScalarTripleProduct(a, b, c, d));
    if (volume6 === 0) {
      throw new ValidationError('Points are coplanar, not a tetrahedron');
    }
  }

  private static computeScalarTripleProduct(a: Point, b: Point, c: Point, d: Point): number {
    const ab = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const ac = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const ad = { x: d.x - a.x, y: d.y - a.y, z: d.z - a.z };

    const cross = {
      x: ac.y * ad.z - ac.z * ad.y,
      y: ac.z * ad.x - ac.x * ad.z,
      z: ac.x * ad.y - ac.y * ad.x
    };

    const triple = ab.x * cross.x + ab.y * cross.y + ab.z * cross.z;
    return triple;
  }

  public static isBaseOnCoordinatePlane(t: Tetrahedron): boolean {
    const points = t.getPoints();

    const onXY = (p: Point): boolean => p.z === 0;
    const onYZ = (p: Point): boolean => p.x === 0;
    const onXZ = (p: Point): boolean => p.y === 0;

    const countOnPlane = (predicate: (p: Point) => boolean): number => {
      let count = 0;
      for (let i = 0; i < points.length; i += 1) {
        if (predicate(points[i])) {
          count += 1;
        }
      }
      return count;
    };

    const countXY = countOnPlane(onXY);
    const countYZ = countOnPlane(onYZ);
    const countXZ = countOnPlane(onXZ);

    if (countXY >= 3 || countYZ >= 3 || countXZ >= 3) {
      return true;
    }

    return false;
  }
}
