const Point = require('../src/point');
const Circle = require('../src/circle');
const compareById = require('../src/comparators/compareById');
const compareByName = require('../src/comparators/compareByName');
const compareByFirstPointX = require('../src/comparators/compareByFirstPointX');
const compareByFirstPointY = require('../src/comparators/compareByFirstPointY');

test('compareById', () => {
  const a = new Circle(2, 'A', new Point(0, 0), 1);
  const b = new Circle(1, 'B', new Point(0, 0), 1);
  const arr = [a, b];
  arr.sort(compareById);
  expect(arr[0].id).toBe(1);
  expect(arr[1].id).toBe(2);
});

test('compareByName', () => {
  const a = new Circle(1, 'B', new Point(0, 0), 1);
  const b = new Circle(2, 'A', new Point(0, 0), 1);
  const arr = [a, b];
  arr.sort(compareByName);
  expect(arr[0].name).toBe('A');
  expect(arr[1].name).toBe('B');
});

test('compareByFirstPointX', () => {
  const a = new Circle(1, 'A', new Point(5, 0), 1);
  const b = new Circle(2, 'B', new Point(1, 0), 1);
  const arr = [a, b];
  arr.sort(compareByFirstPointX);
  expect(arr[0].id).toBe(2);
  expect(arr[1].id).toBe(1);
});

test('compareByFirstPointY', () => {
  const a = new Circle(1, 'A', new Point(0, 5), 1);
  const b = new Circle(2, 'B', new Point(0, 1), 1);
  const arr = [a, b];
  arr.sort(compareByFirstPointY);
  expect(arr[0].id).toBe(2);
  expect(arr[1].id).toBe(1);
});
