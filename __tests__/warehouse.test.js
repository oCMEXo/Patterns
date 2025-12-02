const Point = require('../src/point');
const Circle = require('../src/circle');
const Warehouse = require('../src/warehouse');

test('Warehouse updates metrics when figure changes', () => {
  const warehouse = Warehouse.getInstance();
  const circle = new Circle(100, 'C', new Point(0, 0), 1);

  circle.addObserver(warehouse);
  warehouse.put(circle);

  const before = warehouse.get(100);
  expect(before).toBeDefined();
  const areaBefore = before.area;

  circle.radius = 2;

  const after = warehouse.get(100);
  expect(after).toBeDefined();
  const areaAfter = after.area;

  expect(areaAfter).not.toBeCloseTo(areaBefore, 6);
  expect(areaAfter).toBeCloseTo(Math.PI * 4, 6);
});
