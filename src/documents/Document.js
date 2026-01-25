class Document {
  constructor(content) {
    this.content = content;
  }

  clone() {
    return new Document(this.content);
  }

  getContent() {
    return this.content;
  }
}

module.exports = Document;
