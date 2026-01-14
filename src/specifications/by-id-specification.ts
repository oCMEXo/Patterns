import { Shape } from '../entities/shape';
import { Specification } from './specification';

export class ByIdSpecification<T extends Shape> implements Specification<T> {
  constructor(private id: string) {}

  public isSatisfiedBy(item: T): boolean {
    return item.id === this.id;
  }
}
