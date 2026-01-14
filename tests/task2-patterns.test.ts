import { ShapeRepository } from '../src/repository/shape-repository';
import { Tetrahedron } from '../src/entities/tetrahedron';
import { Point } from '../src/entities/point';
import { Warehouse } from '../src/warehouse/warehouse';
import { WarehouseObserver } from '../src/observers/warehouse-observer';
import { ByIdSpecification } from '../src/specifications/by-id-specification';
import { MetricRangeSpecification } from '../src/specifications/metric-range-specification';
import { ByFirstPointXComparator } from '../src/comparators/by-first-point-x-comparator';

const makeTetra = (id: string, shift = 0): Tetrahedron => new Tetrahedron(id, [
  new Point(0 + shift, 0, 0),
  new Point(1 + shift, 0, 0),
  new Point(0 + shift, 1, 0),
  new Point(0 + shift, 0, 1)
]);

describe('Task II patterns', () => {
  test('Repository add/remove/query', () => {
    const repo = new ShapeRepository<Tetrahedron>();
    const t1 = makeTetra('t1');
    const t2 = makeTetra('t2', 10);

    repo.add(t1);
    repo.add(t2);

    expect(repo.getAll().length).toBe(2);
    expect(repo.getById('t1')?.id).toBe('t1');

    const found = repo.query(new ByIdSpecification<Tetrahedron>('t2'));
    expect(found.length).toBe(1);
    expect(found[0].id).toBe('t2');

    repo.removeById('t1');
    expect(repo.getAll().length).toBe(1);
    expect(repo.getById('t1')).toBeUndefined();
  });

  test('Warehouse is singleton and stores metrics', () => {
    const w1 = Warehouse.getInstance();
    const w2 = Warehouse.getInstance();

    w1.clear();
    w1.set('x', { area: 1, volume: 2, perimeter: 3 });

    expect(w1).toBe(w2);
    expect(w2.get('x')?.volume).toBe(2);
  });

  test('Observer updates warehouse on shape change', () => {
    const warehouse = Warehouse.getInstance();
    warehouse.clear();

    const observer = new WarehouseObserver();
    const t = makeTetra('t1');
    t.attachObserver(observer);

    observer.update(t);
    const before = warehouse.get('t1');
    expect(before).toBeDefined();
    expect(before?.volume).toBeGreaterThan(0);

    t.updatePoint(0, new Point(5, 0, 0));
    const after = warehouse.get('t1');

    expect(after).toBeDefined();
    expect(after?.volume).not.toBe(before?.volume);
  });

  test('Specification by metric range uses warehouse values', () => {
    const repo = new ShapeRepository<Tetrahedron>();
    const warehouse = Warehouse.getInstance();
    warehouse.clear();

    const observer = new WarehouseObserver();
    const t1 = makeTetra('t1');
    const t2 = makeTetra('t2', 20);

    t1.attachObserver(observer);
    t2.attachObserver(observer);

    repo.add(t1);
    repo.add(t2);

    observer.update(t1);
    observer.update(t2);

    const inRange = repo.query(new MetricRangeSpecification<Tetrahedron>('volume', 0.1, 1));
    expect(inRange.length).toBeGreaterThan(0);
    expect(inRange.some((t) => t.id === 't1')).toBe(true);
  });

  test('Comparator sorts by first point X', () => {
    const repo = new ShapeRepository<Tetrahedron>();
    const t1 = makeTetra('t1', 10);
    const t2 = makeTetra('t2', 0);

    repo.add(t1);
    repo.add(t2);

    const sorted = repo.sort(new ByFirstPointXComparator<Tetrahedron>());
    expect(sorted[0].id).toBe('t2');
    expect(sorted[1].id).toBe('t1');
  });
});
