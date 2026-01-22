const ExecutionStrategy = require("./ExecutionStrategy");

class SpiralStrategy extends ExecutionStrategy {
  execute(taskName) {
    console.log(`Executing "${taskName}" using Spiral (risk-driven iterations, prototyping, evaluation).`);
  }
}

module.exports = SpiralStrategy;
