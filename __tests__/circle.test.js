const Point = require('../src/point');
const Circle = require('../src/circle');

test('Circle area and perimeter are calculated correctly', () => {
  const circle = new Circle(1, 'C1', new Point(0, 0), 2);
  const expectedArea = Math.PI * 4;
  const expectedPerimeter = 2 * Math.PI * 2;

  expect(circle.calculateArea()).toBeCloseTo(expectedArea, 6);
  expect(circle.calculatePerimeter()).toBeCloseTo(expectedPerimeter, 6);
});
