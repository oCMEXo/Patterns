const Task = require("./Task");

/**
 * Composite in Composite tree: a project that can contain tasks and subprojects.
 */
class ProjectTask extends Task {
  /**
   * @param {string} name
   */
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  /**
   * @param {Task} task
   */
  add(task) {
    this.children.push(task);
  }

  /**
   * @param {Task} task
   */
  remove(task) {
    this.children = this.children.filter((t) => t !== task);
  }

  execute() {
    console.log(`
=== Project start: ${this.name} ===`);
    for (const child of this.children) {
      child.execute();
    }
    console.log(`=== Project end: ${this.name} ===
`);
  }
}

module.exports = ProjectTask;
