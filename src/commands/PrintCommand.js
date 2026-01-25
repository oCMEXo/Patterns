const Command = require('./Command');

class PrintCommand extends Command {
  constructor(document) {
    super();
    this.document = document;
  }

  execute() {
    console.log(this.document.getContent());
  }
}

module.exports = PrintCommand;
