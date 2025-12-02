const Point = require('../src/point');
const Triangle = require('../src/triangle');

test('Triangle perimeter and area (3-4-5 right triangle)', () => {
  const t = new Triangle(1, 'T1',
    new Point(0, 0), new Point(3, 0), new Point(0, 4));

  expect(t.calculatePerimeter()).toBeCloseTo(12.0, 6);
  expect(t.calculateArea()).toBeCloseTo(6.0, 6);
});
