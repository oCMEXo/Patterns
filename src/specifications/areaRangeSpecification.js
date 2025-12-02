const Warehouse = require('../warehouse');

class AreaRangeSpecification {
  constructor(minArea, maxArea) {
    if (minArea > maxArea) {
      throw new Error('minArea must be <= maxArea');
    }
    this.minArea = minArea;
    this.maxArea = maxArea;
    this.warehouse = Warehouse.getInstance();
  }

  isSatisfiedBy(candidate) {
    const metrics = this.warehouse.get(candidate.id);
    if (!metrics) return false;
    const area = metrics.area;
    return area >= this.minArea && area <= this.maxArea;
  }
}

module.exports = AreaRangeSpecification;
