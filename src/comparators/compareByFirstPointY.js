// Comparator by Y coordinate of first point
function compareByFirstPointY(a, b) {
  const ay = a.getPoints()[0].y;
  const by = b.getPoints()[0].y;
  return ay - by;
}

module.exports = compareByFirstPointY;
