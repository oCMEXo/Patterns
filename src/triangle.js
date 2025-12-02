const Figure = require('./figure');
const Point = require('./point');

class Triangle extends Figure {
  constructor(id, name, a, b, c) {
    super(id, name);
    [a, b, c].forEach(p => {
      if (!(p instanceof Point)) {
        throw new Error('Triangle vertices must be Points');
      }
    });
    this._a = a;
    this._b = b;
    this._c = c;
  }

  get a() {
    return this._a;
  }

  set a(value) {
    if (!(value instanceof Point)) {
      throw new Error('vertex must be a Point');
    }
    this._a = value;
    this.notifyObservers();
  }

  get b() {
    return this._b;
  }

  set b(value) {
    if (!(value instanceof Point)) {
      throw new Error('vertex must be a Point');
    }
    this._b = value;
    this.notifyObservers();
  }

  get c() {
    return this._c;
  }

  set c(value) {
    if (!(value instanceof Point)) {
      throw new Error('vertex must be a Point');
    }
    this._c = value;
    this.notifyObservers();
  }

  getPoints() {
    return [this._a, this._b, this._c];
  }

  calculatePerimeter() {
    const ab = this._distance(this._a, this._b);
    const bc = this._distance(this._b, this._c);
    const ca = this._distance(this._c, this._a);
    return ab + bc + ca;
  }

  calculateArea() {
    const ab = this._distance(this._a, this._b);
    const bc = this._distance(this._b, this._c);
    const ca = this._distance(this._c, this._a);
    const p = (ab + bc + ca) / 2.0;
    return Math.sqrt(Math.max(p * (p - ab) * (p - bc) * (p - ca), 0));
  }

  _distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

module.exports = Triangle;
