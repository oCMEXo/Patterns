class DocumentDecorator {
  constructor(document) {
    this.document = document;
  }

  getContent() {
    return this.document.getContent();
  }
}

module.exports = DocumentDecorator;
