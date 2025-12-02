const Point = require('./point');
const Circle = require('./circle');
const Triangle = require('./triangle');
const Warehouse = require('./warehouse');
const FigureRepository = require('./repository');

const compareById = require('./comparators/compareById');

function main() {
  const warehouse = Warehouse.getInstance();
  const repo = new FigureRepository();

  const circle = new Circle(1, 'Circle1', new Point(1, 1), 2);
  const triangle = new Triangle(2, 'Triangle1',
    new Point(1, 1), new Point(2, 1), new Point(1, 3));

  circle.addObserver(warehouse);
  triangle.addObserver(warehouse);

  warehouse.put(circle);
  warehouse.put(triangle);

  repo.add(circle);
  repo.add(triangle);

  console.log('All figures:');
  for (const f of repo.getAll()) {
    console.log(f.constructor.name, f.id, f.name, warehouse.get(f.id));
  }

  console.log('\nSorted by id:');
  const sorted = repo.sort(compareById);
  for (const f of sorted) {
    console.log(f.id, f.name);
  }
}

if (require.main === module) {
  main();
}
