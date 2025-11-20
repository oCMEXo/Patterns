import { TetrahedronFileReader } from './readers/tetrahedron-file-reader';
import { TetrahedronValidator } from './validators/tetrahedron-validator';
import { TetrahedronService } from './services/tetrahedron-service';
import { logger } from './logger';
import { AppError } from './errors/app-error';

function main(): void {
  const reader = new TetrahedronFileReader('./data/tetrahedrons.txt');
  const service = new TetrahedronService();

  try {
    const tetrahedrons = reader.readAll();
    logger.info({ count: tetrahedrons.length }, 'Successfully read tetrahedrons');

    tetrahedrons.forEach((t) => {
      try {
        TetrahedronValidator.validateTetrahedron(t);
        const area = service.computeSurfaceArea(t);
        const volume = service.computeVolume(t);
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
  } catch (error) {
    if (error instanceof AppError) {
      logger.error({ error }, 'Application error');
    } else {
      logger.error({ error }, 'Unexpected fatal error');
    }
  }
}

main();
