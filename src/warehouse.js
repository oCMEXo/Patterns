/**
 * Warehouse stores calculated metrics (area, perimeter, volume) for figures.
 * Implemented as Singleton and used as an observer.
 */

class Warehouse {
  constructor() {
    if (Warehouse._instance) {
      return Warehouse._instance;
    }
    this._storage = new Map();
    Warehouse._instance = this;
  }

  static getInstance() {
    if (!Warehouse._instance) {
      Warehouse._instance = new Warehouse();
    }
    return Warehouse._instance;
  }

  put(figure) {
    this._storage.set(figure.id, this._createMetrics(figure));
  }

  get(id) {
    return this._storage.get(id);
  }

  remove(id) {
    this._storage.delete(id);
  }

  getAll() {
    return new Map(this._storage);
  }

  _createMetrics(figure) {
    return {
      area: figure.calculateArea(),
      perimeter: figure.calculatePerimeter(),
      volume: figure.calculateVolume()
    };
  }

  // Observer callback
  onFigureChanged(figure) {
    this._storage.set(figure.id, this._createMetrics(figure));
  }
}

module.exports = Warehouse;
