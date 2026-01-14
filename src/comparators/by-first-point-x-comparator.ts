import { Shape } from '../entities/shape';
import { Comparator } from './comparator';

export class ByFirstPointXComparator<T extends Shape> implements Comparator<T> {
  public compare(a: T, b: T): number {
    return a.getPoints()[0].x - b.getPoints()[0].x;
  }
}
