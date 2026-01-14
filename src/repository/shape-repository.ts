import { Shape } from '../entities/shape';
import { Specification } from '../specifications/specification';
import { Comparator } from '../comparators/comparator';

export class ShapeRepository<T extends Shape> {
  private items = new Map<string, T>();

  public add(item: T): void {
    this.items.set(item.id, item);
  }

  public removeById(id: string): void {
    this.items.delete(id);
  }

  public getById(id: string): T | undefined {
    return this.items.get(id);
  }

  public getAll(): T[] {
    return Array.from(this.items.values());
  }

  public query(spec: Specification<T>): T[] {
    return this.getAll().filter((i) => spec.isSatisfiedBy(i));
  }

  public sort(comparator: Comparator<T>): T[] {
    return this.getAll().sort((a, b) => comparator.compare(a, b));
  }
}
