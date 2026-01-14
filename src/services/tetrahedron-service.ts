import { Tetrahedron } from '../entities/tetrahedron';
import { Point } from '../entities/point';
import { CalculationValidator } from '../validators/calculation-validator';

export type CoordinatePlane = 'XY' | 'YZ' | 'XZ';

export class TetrahedronService {
  public computeSurfaceArea(t: Tetrahedron): number {
    const [a, b, c, d] = t.getPoints();
    const areaABC = this.computeTriangleArea(a, b, c);
    const areaABD = this.computeTriangleArea(a, b, d);
    const areaACD = this.computeTriangleArea(a, c, d);
    const areaBCD = this.computeTriangleArea(b, c, d);

    const area = areaABC + areaABD + areaACD + areaBCD;
    CalculationValidator.validatePositive(area, 'surface area');

    return area;
  }

  public computeVolume(t: Tetrahedron): number {
    const [a, b, c, d] = t.getPoints();
    const ab = this.sub(b, a);
    const ac = this.sub(c, a);
    const ad = this.sub(d, a);

    const cross = this.cross(ac, ad);
    const triple = this.dot(ab, cross);
    const volume = Math.abs(triple) / 6;

    CalculationValidator.validatePositive(volume, 'volume');

    return volume;
  }

  public computeVolumeRatioByPlane(t: Tetrahedron, plane: CoordinatePlane): number {
    const points = t.getPoints();
    const totalVolume = this.computeVolume(t);

    const values = points.map((p) => {
      if (plane === 'XY') {
        return p.z;
      }
      if (plane === 'YZ') {
        return p.x;
      }
      return p.y;
    });

    const positives: number[] = [];
    const negatives: number[] = [];
    for (let i = 0; i < values.length; i += 1) {
      if (values[i] > 0) {
        positives.push(i);
      } else if (values[i] < 0) {
        negatives.push(i);
      }
    }

    if (positives.length === 0 || negatives.length === 0) {
      return Infinity;
    }

    if (positives.length === 1 && negatives.length === 3) {
      return this.computeCutRatio(points, positives[0], negatives, plane, totalVolume);
    }

    if (negatives.length === 1 && positives.length === 3) {
      return this.computeCutRatio(points, negatives[0], positives, plane, totalVolume);
    }

    return 1;
  }

  private computeCutRatio(
    points: Point[],
    singleIndex: number,
    otherIndices: number[],
    plane: CoordinatePlane,
    totalVolume: number
  ): number {
    const apex = points[singleIndex];
    const others = otherIndices.map((i) => points[i]);

    const intersections: Point[] = [];
    for (let i = 0; i < others.length; i += 1) {
      const edgePoint = others[i];
      const t = this.computeIntersectionT(apex, edgePoint, plane);
      const intersection = this.interpolate(apex, edgePoint, t);
      intersections.push(intersection);
    }

    const smallTetra = new Tetrahedron('cut', [apex, intersections[0], intersections[1], intersections[2]]);
    const smallVolume = this.computeVolume(smallTetra);

    CalculationValidator.validateNonNegative(smallVolume, 'small volume after cut');

    const restVolume = totalVolume - smallVolume;
    CalculationValidator.validateNonNegative(restVolume, 'rest volume after cut');

    if (restVolume === 0) {
      return Infinity;
    }

    return smallVolume / restVolume;
  }

  private computeIntersectionT(a: Point, b: Point, plane: CoordinatePlane): number {
    if (plane === 'XY') {
      return a.z / (a.z - b.z);
    }
    if (plane === 'YZ') {
      return a.x / (a.x - b.x);
    }
    return a.y / (a.y - b.y);
  }

  private interpolate(a: Point, b: Point, t: number): Point {
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;
    const z = a.z + (b.z - a.z) * t;
    return new Point(x, y, z);
  }

  private computeTriangleArea(a: Point, b: Point, c: Point): number {
    const ab = this.sub(b, a);
    const ac = this.sub(c, a);
    const cross = this.cross(ab, ac);
    const area = 0.5 * Math.sqrt(
      cross.x * cross.x + cross.y * cross.y + cross.z * cross.z
    );
    return area;
  }


  public computeEdgeSum(t: Tetrahedron): number {
    const [a, b, c, d] = t.getPoints();
    const edges = [
      this.distance(a, b),
      this.distance(a, c),
      this.distance(a, d),
      this.distance(b, c),
      this.distance(b, d),
      this.distance(c, d),
    ];
    const sum = edges.reduce((s, v) => s + v, 0);
    CalculationValidator.validatePositive(sum, 'perimeter');
    return sum;
  }

  private sub(a: Point, b: Point): { x: number; y: number; z: number } {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z
    };
  }

  private cross(
    u: { x: number; y: number; z: number },
    v: { x: number; y: number; z: number }
  ): { x: number; y: number; z: number } {
    return {
      x: u.y * v.z - u.z * v.y,
      y: u.z * v.x - u.x * v.z,
      z: u.x * v.y - u.y * v.x
    };
  }

  private dot(
    u: { x: number; y: number; z: number },
    v: { x: number; y: number; z: number }
  ): number {
    return u.x * v.x + u.y * v.y + u.z * v.z;
  }
}
