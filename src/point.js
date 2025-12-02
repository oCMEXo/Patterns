class Point {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  distanceFromOrigin() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  toString() {
    return `Point(${this._x}, ${this._y})`;
  }
}

module.exports = Point;
