const Command = require('./Command');

class SaveCommand extends Command {
  constructor(document) {
    super();
    this.document = document;
  }

  execute() {
    console.log('Document saved:', this.document.getContent());
  }
}

module.exports = SaveCommand;
