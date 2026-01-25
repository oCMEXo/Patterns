const DocumentDecorator = require('./DocumentDecorator');

class SignedDocument extends DocumentDecorator {
  getContent() {
    return `${super.getContent()} [Signed]`;
  }
}

module.exports = SignedDocument;
