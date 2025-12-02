class NameSpecification {
  constructor(name) {
    this.name = name;
  }

  isSatisfiedBy(candidate) {
    return candidate.name === this.name;
  }
}

module.exports = NameSpecification;
