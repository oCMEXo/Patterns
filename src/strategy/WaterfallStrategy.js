const ExecutionStrategy = require("./ExecutionStrategy");

class WaterfallStrategy extends ExecutionStrategy {
  execute(taskName) {
    console.log(`Executing "${taskName}" using Waterfall (requirements → design → implementation → test → deploy).`);
  }
}

module.exports = WaterfallStrategy;
