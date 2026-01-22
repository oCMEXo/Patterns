const Task = require("./Task");
class SimpleTask extends Task {
  constructor(name, strategy) {
    super();
    this.name = name;
    this.strategy = strategy;
  }
  execute() {
    this.strategy.execute(this.name);
  }
}
module.exports = SimpleTask;
