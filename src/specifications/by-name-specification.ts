import { Shape } from '../entities/shape';
import { Specification } from './specification';

export class ByNameSpecification<T extends Shape> implements Specification<T> {
  constructor(private name: string) {}

  public isSatisfiedBy(item: T): boolean {
    return item.name === this.name;
  }
}
