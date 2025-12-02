const Warehouse = require('../warehouse');

class PerimeterRangeSpecification {
  constructor(minPerimeter, maxPerimeter) {
    if (minPerimeter > maxPerimeter) {
      throw new Error('minPerimeter must be <= maxPerimeter');
    }
    this.minPerimeter = minPerimeter;
    this.maxPerimeter = maxPerimeter;
    this.warehouse = Warehouse.getInstance();
  }

  isSatisfiedBy(candidate) {
    const metrics = this.warehouse.get(candidate.id);
    if (!metrics) return false;
    const perimeter = metrics.perimeter;
    return perimeter >= this.minPerimeter && perimeter <= this.maxPerimeter;
  }
}

module.exports = PerimeterRangeSpecification;
