// Comparator by X coordinate of first point
function compareByFirstPointX(a, b) {
  const ax = a.getPoints()[0].x;
  const bx = b.getPoints()[0].x;
  return ax - bx;
}

module.exports = compareByFirstPointX;
