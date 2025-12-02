const Point = require('../src/point');
const Circle = require('../src/circle');
const Triangle = require('../src/triangle');
const FigureRepository = require('../src/repository');

const compareById = require('../src/comparators/compareById');

test('Repository add and removeById', () => {
  const repo = new FigureRepository();
  const circle = new Circle(1, 'C1', new Point(1, 1), 2);

  repo.add(circle);
  expect(repo.getAll().length).toBe(1);

  const removed = repo.removeById(1);
  expect(removed).toBe(true);
  expect(repo.getAll().length).toBe(0);
});

test('Repository sort by id', () => {
  const repo = new FigureRepository();
  const circle = new Circle(2, 'C', new Point(0, 0), 1);
  const triangle = new Triangle(1, 'T',
    new Point(0, 0), new Point(1, 0), new Point(0, 1));

  repo.add(circle);
  repo.add(triangle);

  const sorted = repo.sort(compareById);
  expect(sorted[0].id).toBe(1);
  expect(sorted[1].id).toBe(2);
});
