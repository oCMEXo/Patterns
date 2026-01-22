/**
 * Component interface (Composite pattern).
 * Both leaf tasks and composite projects implement the same API.
 */
class Task {
  /**
   * Execute the task/project.
   * @returns {void}
   */
  execute() {
    throw new Error("Not implemented");
  }

  /**
   * Add a child task (only meaningful for composites).
   * @param {Task} _task
   */
  add(_task) {
    throw new Error("This operation is not supported for leaf tasks.");
  }

  /**
   * Remove a child task (only meaningful for composites).
   * @param {Task} _task
   */
  remove(_task) {
    throw new Error("This operation is not supported for leaf tasks.");
  }
}

module.exports = Task;
