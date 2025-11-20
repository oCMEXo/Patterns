"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrahedronFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const tetrahedron_factory_1 = require("../factories/tetrahedron-factory");
const app_error_1 = require("../errors/app-error");
const logger_1 = require("../logger");
class TetrahedronFileReader {
    constructor(relativePath) {
        this.filePath = path_1.default.resolve(relativePath);
    }
    readAll() {
        const tetrahedrons = [];
        let content;
        try {
            content = fs_1.default.readFileSync(this.filePath, 'utf-8');
        }
        catch (error) {
            logger_1.logger.error({ err: error }, 'Failed to read file');
            throw new app_error_1.FileReadError(`Failed to read file at ${this.filePath}`);
        }
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i += 1) {
            const rawLine = lines[i];
            if (!rawLine.trim()) {
                continue;
            }
            try {
                const tetra = tetrahedron_factory_1.TetrahedronFactory.createFromLine(rawLine);
                tetrahedrons.push(tetra);
            }
            catch (error) {
                logger_1.logger.warn({ lineNumber: i + 1, line: rawLine, err: error }, 'Skipping invalid line');
            }
        }
        return tetrahedrons;
    }
}
exports.TetrahedronFileReader = TetrahedronFileReader;
