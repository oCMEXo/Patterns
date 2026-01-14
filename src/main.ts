import { TetrahedronFileReader } from './readers/tetrahedron-file-reader';
import { TetrahedronValidator } from './validators/tetrahedron-validator';
import { TetrahedronService } from './services/tetrahedron-service';
import { logger } from './logger';
import { AppError } from './errors/app-error';
import { ShapeRepository } from './repository/shape-repository';
import { Warehouse } from './warehouse/warehouse';
import { WarehouseObserver } from './observers/warehouse-observer';
import { ByIdSpecification } from './specifications/by-id-specification';
import { MetricRangeSpecification } from './specifications/metric-range-specification';
import { ByFirstPointXComparator } from './comparators/by-first-point-x-comparator';
import { Point } from './entities/point';
import { Tetrahedron } from './entities/tetrahedron';

function main(): void {
  const reader = new TetrahedronFileReader('./data/tetrahedrons.txt');
  const service = new TetrahedronService();
  const repo = new ShapeRepository<Tetrahedron>();
  const warehouse = Warehouse.getInstance();
  const warehouseObserver = new WarehouseObserver();

  try {
    const tetrahedrons = reader.readAll();
    logger.info({ count: tetrahedrons.length }, 'Successfully read tetrahedrons');

    tetrahedrons.forEach((t) => {
      t.attachObserver(warehouseObserver);
      repo.add(t);
      warehouseObserver.update(t);
    });

    const foundById = repo.query(new ByIdSpecification<Tetrahedron>('t1'));
    logger.info({ found: foundById.map((t) => t.id) }, 'Query by id');

    const volumeInRange = repo.query(new MetricRangeSpecification<Tetrahedron>('volume', 0.1, 10));
    logger.info({ found: volumeInRange.map((t) => t.id) }, 'Query by volume range');

    const sortedByX = repo.sort(new ByFirstPointXComparator<Tetrahedron>());
    logger.info({ sorted: sortedByX.map((t) => t.id) }, 'Sort by first point X');

    tetrahedrons.forEach((t) => {
      try {
        TetrahedronValidator.validateIsTetrahedron(t);

        const metrics = warehouse.get(t.id);
        const area = metrics ? metrics.area : service.computeSurfaceArea(t);
        const volume = metrics ? metrics.volume : service.computeVolume(t);

        const ratioXY = service.computeVolumeRatioByPlane(t, 'XY');
        logger.info({
          id: t.id,
          area,
          volume,
          ratioXY,
          baseOnPlane: TetrahedronValidator.isBaseOnCoordinatePlane(t)
        }, 'Tetrahedron calculations');
      } catch (error) {
        if (error instanceof AppError) {
          logger.error({ id: t.id, error }, 'Validation or calculation error for tetrahedron');
        } else {
          logger.error({ id: t.id, error }, 'Unexpected error for tetrahedron');
        }
      }
    });

    const first = repo.getById('t1');
    if (first) {
      const before = warehouse.get(first.id);
      first.updatePoint(0, new Point(first.getPoints()[0].x + 1, first.getPoints()[0].y, first.getPoints()[0].z));
      const after = warehouse.get(first.id);
      logger.info({ id: first.id, before, after }, 'Warehouse updated after shape change');
    }
  } catch (error) {
    if (error instanceof AppError) {
      logger.error({ error }, 'Application error');
    } else {
      logger.error({ error }, 'Unexpected fatal error');
    }
  }
}

main();
