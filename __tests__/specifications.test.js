const Point = require('../src/point');
const Circle = require('../src/circle');
const Triangle = require('../src/triangle');
const Warehouse = require('../src/warehouse');
const FigureRepository = require('../src/repository');

const IdSpecification = require('../src/specifications/idSpecification');
const NameSpecification = require('../src/specifications/nameSpecification');
const FirstQuadrantSpecification = require('../src/specifications/firstQuadrantSpecification');
const AreaRangeSpecification = require('../src/specifications/areaRangeSpecification');
const PerimeterRangeSpecification = require('../src/specifications/perimeterRangeSpecification');
const VolumeRangeSpecification = require('../src/specifications/volumeRangeSpecification');
const DistanceFromOriginRangeSpecification = require('../src/specifications/distanceFromOriginRangeSpecification');

beforeEach(() => {
  // reset singleton storage between tests (hacky but fine for demo)
  const warehouse = Warehouse.getInstance();
  warehouse._storage = new Map();
});

test('IdSpecification and NameSpecification', () => {
  const repo = new FigureRepository();
  const c1 = new Circle(1, 'A', new Point(0, 0), 1);
  const c2 = new Circle(2, 'B', new Point(0, 0), 1);

  repo.add(c1);
  repo.add(c2);

  const byId = new IdSpecification(2);
  const resId = repo.query(byId);
  expect(resId).toHaveLength(1);
  expect(resId[0].id).toBe(2);

  const byName = new NameSpecification('A');
  const resName = repo.query(byName);
  expect(resName).toHaveLength(1);
  expect(resName[0].name).toBe('A');
});

test('FirstQuadrantSpecification', () => {
  const repo = new FigureRepository();
  const t1 = new Triangle(1, 'T1',
    new Point(1, 1), new Point(2, 1), new Point(1, 2));
  const t2 = new Triangle(2, 'T2',
    new Point(-1, 1), new Point(2, 1), new Point(1, 2));

  repo.add(t1);
  repo.add(t2);

  const spec = new FirstQuadrantSpecification();
  const res = repo.query(spec);

  expect(res).toHaveLength(1);
  expect(res[0].id).toBe(1);
});

test('AreaRangeSpecification, PerimeterRangeSpecification, VolumeRangeSpecification', () => {
  const warehouse = Warehouse.getInstance();
  const repo = new FigureRepository();

  const small = new Circle(1, 'Small', new Point(0, 0), 1);
  const big = new Circle(2, 'Big', new Point(0, 0), 10);

  small.addObserver(warehouse);
  big.addObserver(warehouse);

  warehouse.put(small);
  warehouse.put(big);

  repo.add(small);
  repo.add(big);

  const areaSpec = new AreaRangeSpecification(0, 10);
  const resArea = repo.query(areaSpec);
  expect(resArea).toHaveLength(1);
  expect(resArea[0].id).toBe(1);

  const perSpec = new PerimeterRangeSpecification(0, 10);
  const resPer = repo.query(perSpec);
  expect(resPer).toHaveLength(1);
  expect(resPer[0].id).toBe(1);

  const volSpec = new VolumeRangeSpecification(0, 0);
  const resVol = repo.query(volSpec);
  expect(resVol).toHaveLength(2); // all 2D shapes with volume 0
});

test('DistanceFromOriginRangeSpecification', () => {
  const repo = new FigureRepository();
  const near = new Circle(1, 'Near', new Point(1, 1), 1);
  const far = new Circle(2, 'Far', new Point(10, 10), 1);

  repo.add(near);
  repo.add(far);

  const spec = new DistanceFromOriginRangeSpecification(0, 2);
  const res = repo.query(spec);

  expect(res).toHaveLength(1);
  expect(res[0].id).toBe(1);
});
