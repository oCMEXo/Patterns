const ExecutionStrategy = require("./ExecutionStrategy");
class SpiralStrategy extends ExecutionStrategy {
  execute(taskName) {
    console.log(`Executing "${taskName}" using Spiral.`);
  }
}
module.exports = SpiralStrategy;
