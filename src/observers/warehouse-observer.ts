import { Observer } from './observer';
import { Shape } from '../entities/shape';
import { Warehouse } from '../warehouse/warehouse';
import { Tetrahedron } from '../entities/tetrahedron';
import { TetrahedronService } from '../services/tetrahedron-service';

export class WarehouseObserver implements Observer<Shape> {
  private service = new TetrahedronService();

  public update(subject: Shape): void {
    if (subject instanceof Tetrahedron) {
      const area = this.service.computeSurfaceArea(subject);
      const volume = this.service.computeVolume(subject);
      const perimeter = this.service.computeEdgeSum(subject);
      Warehouse.getInstance().set(subject.id, { area, volume, perimeter });
    }
  }
}
