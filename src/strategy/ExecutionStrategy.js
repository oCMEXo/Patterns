/**
 * Strategy interface: defines how a task should be executed.
 * @interface
 */
class ExecutionStrategy {
  /**
   * @param {string} taskName
   * @returns {void}
   */
  execute(taskName) {
    throw new Error("Not implemented");
  }
}

module.exports = ExecutionStrategy;
