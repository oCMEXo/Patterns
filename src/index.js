const TextDocument = require('./documents/TextDocument');
const EncryptedDocument = require('./decorators/EncryptedDocument');
const SignedDocument = require('./decorators/SignedDocument');
const PrintCommand = require('./commands/PrintCommand');
const SaveCommand = require('./commands/SaveCommand');
const DocumentInvoker = require('./invoker/DocumentInvoker');

const original = new TextDocument('My document');
const copy = original.clone();

const encrypted = new EncryptedDocument(copy);
const signedEncrypted = new SignedDocument(encrypted);

const invoker = new DocumentInvoker();
invoker.execute(new PrintCommand(signedEncrypted));
invoker.execute(new SaveCommand(signedEncrypted));
