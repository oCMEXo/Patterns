const Task = require("./Task");
class ProjectTask extends Task {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }
  add(task) {
    this.children.push(task);
  }
  remove(task) {
    this.children = this.children.filter(t => t !== task);
  }
  execute() {
    console.log(`\n=== Project start: ${this.name} ===`);
    for (const child of this.children) {
      child.execute();
    }
    console.log(`=== Project end: ${this.name} ===\n`);
  }
}
module.exports = ProjectTask;
