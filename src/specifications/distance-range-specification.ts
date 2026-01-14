import { Shape } from '../entities/shape';
import { Specification } from './specification';

export class DistanceFromOriginRangeSpecification<T extends Shape> implements Specification<T> {
  constructor(private min: number, private max: number) {}

  public isSatisfiedBy(item: T): boolean {
    const pts = item.getPoints();
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    const cz = pts.reduce((s, p) => s + p.z, 0) / pts.length;
    const dist = Math.sqrt(cx * cx + cy * cy + cz * cz);
    return dist >= this.min && dist <= this.max;
  }
}
