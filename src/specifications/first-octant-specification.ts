import { Shape } from '../entities/shape';
import { Specification } from './specification';

export class FirstOctantSpecification<T extends Shape> implements Specification<T> {
  public isSatisfiedBy(item: T): boolean {
    return item.getPoints().every((p) => p.x > 0 && p.y > 0 && p.z > 0);
  }
}
