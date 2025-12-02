/**
 * Repository for storing and managing figures.
 * Implements add, remove, query (Specification pattern), sort (Comparator).
 */
class FigureRepository {
  constructor() {
    this._figures = [];
  }

  add(figure) {
    this._figures.push(figure);
  }

  removeById(id) {
    const before = this._figures.length;
    this._figures = this._figures.filter(f => f.id !== id);
    return this._figures.length < before;
  }

  remove(figure) {
    const before = this._figures.length;
    this._figures = this._figures.filter(f => f !== figure);
    return this._figures.length < before;
  }

  getAll() {
    return [...this._figures];
  }

  /**
   * Specification is any object with method isSatisfiedBy(figure): boolean
   */
  query(specification) {
    return this._figures.filter(f => specification.isSatisfiedBy(f));
  }

  /**
   * Comparator is a function (a, b) => number
   */
  sort(comparator) {
    return [...this._figures].sort(comparator);
  }
}

module.exports = FigureRepository;
