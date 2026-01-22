const ProjectTask = require("./composite/ProjectTask");
const SimpleTask = require("./composite/SimpleTask");

const AgileStrategy = require("./strategy/AgileStrategy");
const WaterfallStrategy = require("./strategy/WaterfallStrategy");
const SpiralStrategy = require("./strategy/SpiralStrategy");
const RUPStrategy = require("./strategy/RUPStrategy");

const agile = new AgileStrategy();
const waterfall = new WaterfallStrategy();
const spiral = new SpiralStrategy();
const rup = new RUPStrategy();

const dev = new SimpleTask("Develop authentication module", agile);
const test = new SimpleTask("Test payment flow", waterfall);
const design = new SimpleTask("Design landing page UI", spiral);
const docs = new SimpleTask("Write user documentation", rup);

const rootProject = new ProjectTask("Project Manager System");

const sprint1 = new ProjectTask("Sprint 1");
sprint1.add(dev);
sprint1.add(design);

const releasePrep = new ProjectTask("Release Preparation");
releasePrep.add(test);
releasePrep.add(docs);

rootProject.add(sprint1);
rootProject.add(releasePrep);

rootProject.execute();
