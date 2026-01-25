const Document = require('./Document');

class TextDocument extends Document {
  constructor(content) {
    super(content);
  }

  clone() {
    return new TextDocument(this.content);
  }
}

module.exports = TextDocument;
