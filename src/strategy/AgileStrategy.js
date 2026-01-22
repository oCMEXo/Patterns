const ExecutionStrategy = require("./ExecutionStrategy");

class AgileStrategy extends ExecutionStrategy {
  execute(taskName) {
    console.log(`Executing "${taskName}" using Agile (iterative increments, backlog, sprints).`);
  }
}

module.exports = AgileStrategy;
