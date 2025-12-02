class FirstQuadrantSpecification {
  isSatisfiedBy(candidate) {
    const points = candidate.getPoints();
    return points.length > 0 && points.every(p => p.x > 0 && p.y > 0);
  }
}

module.exports = FirstQuadrantSpecification;
