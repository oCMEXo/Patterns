"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const LOG_DIR = path_1.default.resolve('logs');
const LOG_FILE_PATH = path_1.default.join(LOG_DIR, 'app.log');
if (!fs_1.default.existsSync(LOG_DIR)) {
    fs_1.default.mkdirSync(LOG_DIR, { recursive: true });
}
const streams = [
    { stream: process.stdout },
    { stream: pino_1.default.destination(LOG_FILE_PATH) },
];
exports.logger = (0, pino_1.default)({
    level: 'info',
}, pino_1.default.multistream(streams));
