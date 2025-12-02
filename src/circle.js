const Figure = require('./figure');
const Point = require('./point');

class Circle extends Figure {
  constructor(id, name, center, radius) {
    super(id, name);
    if (!(center instanceof Point)) {
      throw new Error('center must be a Point');
    }
    if (radius <= 0) {
      throw new Error('radius must be positive');
    }
    this._center = center;
    this._radius = radius;
  }

  get center() {
    return this._center;
  }

  set center(value) {
    if (!(value instanceof Point)) {
      throw new Error('center must be a Point');
    }
    this._center = value;
    this.notifyObservers();
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value <= 0) {
      throw new Error('radius must be positive');
    }
    this._radius = value;
    this.notifyObservers();
  }

  getPoints() {
    return [this._center];
  }

  calculatePerimeter() {
    return 2 * Math.PI * this._radius;
  }

  calculateArea() {
    return Math.PI * this._radius * this._radius;
  }
}

module.exports = Circle;
