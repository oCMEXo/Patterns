import { Point } from '../src/entities/point';
import { Tetrahedron } from '../src/entities/tetrahedron';
import { TetrahedronService } from '../src/services/tetrahedron-service';
import { TetrahedronValidator } from '../src/validators/tetrahedron-validator';


describe('TetrahedronService', () => {
  const service = new TetrahedronService();

  it('computes positive surface area and volume for a valid tetrahedron', () => {
    const a = new Point(0, 0, 0);
    const b = new Point(1, 0, 0);
    const c = new Point(0, 1, 0);
    const d = new Point(0, 0, 1);
    const t = new Tetrahedron('test', [a, b, c, d]);

    TetrahedronValidator.validateTetrahedron(t);

    const area = service.computeSurfaceArea(t);
    const volume = service.computeVolume(t);

    expect(area).toBeGreaterThan(0);
    expect(volume).toBeGreaterThan(0);
    expect(Number.isFinite(area)).toBe(true);
    expect(Number.isFinite(volume)).toBe(true);
  });

  it('computes volume ratio for cut by XY plane when one vertex is below and others above', () => {
    const a = new Point(0, 0, 1);
    const b = new Point(1, 0, 1);
    const c = new Point(0, 1, 1);
    const d = new Point(0, 0, -1);
    const t = new Tetrahedron('cut', [a, b, c, d]);

    const ratio = service.computeVolumeRatioByPlane(t, 'XY');

    expect(ratio).toBeGreaterThan(0);
    expect(ratio).toBeLessThan(1);
    expect(Number.isFinite(ratio)).toBe(true);
  });
});

describe('TetrahedronValidator', () => {
  it('detects coplanar points as invalid tetrahedron', () => {
    const a = new Point(0, 0, 0);
    const b = new Point(1, 0, 0);
    const c = new Point(0, 1, 0);
    const d = new Point(1, 1, 0);
    const t = new Tetrahedron('plane', [a, b, c, d]);

    expect(() => TetrahedronValidator.validateTetrahedron(t)).toThrow();
  });

  it('detects base on coordinate plane', () => {
    const a = new Point(0, 0, 0);
    const b = new Point(1, 0, 0);
    const c = new Point(0, 1, 0);
    const d = new Point(0, 0, 1);
    const t = new Tetrahedron('base', [a, b, c, d]);

    const isOnPlane = TetrahedronValidator.isBaseOnCoordinatePlane(t);

    expect(isOnPlane).toBe(true);
    expect(t.id).toBe('base');
  });
});
