const Task = require("./Task");

/**
 * Leaf in Composite tree: an individual task.
 * Uses Strategy to define how it is executed.
 */
class SimpleTask extends Task {
  /**
   * @param {string} name
   * @param {{ execute(taskName: string): void }} strategy
   */
  constructor(name, strategy) {
    super();
    this.name = name;
    this.strategy = strategy;
  }

  execute() {
    this.strategy.execute(this.name);
  }

  // Leaf: add/remove are not supported (inherited exceptions are fine),
  // but you can also override them to no-op if your teacher prefers.
}

module.exports = SimpleTask;
