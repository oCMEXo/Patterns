class IdSpecification {
  constructor(id) {
    this.id = id;
  }

  isSatisfiedBy(candidate) {
    return candidate.id === this.id;
  }
}

module.exports = IdSpecification;
