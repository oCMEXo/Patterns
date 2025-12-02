class DistanceFromOriginRangeSpecification {
  constructor(minDistance, maxDistance) {
    if (minDistance > maxDistance) {
      throw new Error('minDistance must be <= maxDistance');
    }
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
  }

  isSatisfiedBy(candidate) {
    const points = candidate.getPoints();
    if (points.length === 0) return false;
    const p = points[0];
    const dist = p.distanceFromOrigin();
    return dist >= this.minDistance && dist <= this.maxDistance;
  }
}

module.exports = DistanceFromOriginRangeSpecification;
