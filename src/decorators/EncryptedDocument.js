const DocumentDecorator = require('./DocumentDecorator');

class EncryptedDocument extends DocumentDecorator {
  getContent() {
    return `Encrypted(${super.getContent()})`;
  }
}

module.exports = EncryptedDocument;
