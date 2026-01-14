import { Shape } from '../entities/shape';
import { Comparator } from './comparator';

export class ByFirstPointYComparator<T extends Shape> implements Comparator<T> {
  public compare(a: T, b: T): number {
    return a.getPoints()[0].y - b.getPoints()[0].y;
  }
}
