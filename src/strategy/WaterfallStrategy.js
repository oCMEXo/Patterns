const ExecutionStrategy = require("./ExecutionStrategy");
class WaterfallStrategy extends ExecutionStrategy {
  execute(taskName) {
    console.log(`Executing "${taskName}" using Waterfall.`);
  }
}
module.exports = WaterfallStrategy;
