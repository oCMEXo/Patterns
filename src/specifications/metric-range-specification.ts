import { Shape } from '../entities/shape';
import { Specification } from './specification';
import { Warehouse } from '../warehouse/warehouse';

export type MetricKey = 'area' | 'volume' | 'perimeter';

export class MetricRangeSpecification<T extends Shape> implements Specification<T> {
  constructor(
    private key: MetricKey,
    private min: number,
    private max: number,
    private warehouse: Warehouse = Warehouse.getInstance()
  ) {}

  public isSatisfiedBy(item: T): boolean {
    const m = this.warehouse.get(item.id);
    if (!m) return false;
    return m[this.key] >= this.min && m[this.key] <= this.max;
  }
}
