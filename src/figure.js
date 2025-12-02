/**
 * Abstract base class for figures.
 * Implements observable behavior (Observer pattern).
 */
class Figure {
  constructor(id, name) {
    if (new.target === Figure) {
      throw new Error('Figure is abstract and cannot be instantiated directly');
    }
    this._id = id;
    this._name = name;
    this._observers = [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this.notifyObservers();
  }

  /**
   * @returns {Point[]} points that define the figure
   */
  getPoints() {
    throw new Error('getPoints must be implemented by subclasses');
  }

  calculatePerimeter() {
    throw new Error('calculatePerimeter must be implemented by subclasses');
  }

  calculateArea() {
    throw new Error('calculateArea must be implemented by subclasses');
  }

  calculateVolume() {
    // default for 2D shapes
    return 0.0;
  }

  // Observer interface
  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter(o => o !== observer);
  }

  notifyObservers() {
    this._observers.forEach(obs => {
      if (typeof obs.onFigureChanged === 'function') {
        obs.onFigureChanged(this);
      }
    });
  }
}

module.exports = Figure;
