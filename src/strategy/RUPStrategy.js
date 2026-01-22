const ExecutionStrategy = require("./ExecutionStrategy");

class RUPStrategy extends ExecutionStrategy {
  execute(taskName) {
    console.log(`Executing "${taskName}" using RUP (inception → elaboration → construction → transition).`);
  }
}

module.exports = RUPStrategy;
