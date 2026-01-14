import { Shape } from '../entities/shape';
import { Comparator } from './comparator';

export class ByIdComparator<T extends Shape> implements Comparator<T> {
  public compare(a: T, b: T): number {
    return a.id.localeCompare(b.id);
  }
}
