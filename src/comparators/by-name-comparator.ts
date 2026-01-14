import { Shape } from '../entities/shape';
import { Comparator } from './comparator';

export class ByNameComparator<T extends Shape> implements Comparator<T> {
  public compare(a: T, b: T): number {
    return a.name.localeCompare(b.name);
  }
}
