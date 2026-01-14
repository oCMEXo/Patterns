"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrahedronFactory = void 0;
const point_1 = require("../entities/point");
const tetrahedron_1 = require("../entities/tetrahedron");
const app_error_1 = require("../errors/app-error");
const line_validator_1 = require("../validators/line-validator");
class TetrahedronFactory {
    static createFromLine(line) {
        try {
            line_validator_1.LineValidator.validateLine(line);
        }
        catch (error) {
            if (error instanceof app_error_1.ShapeCreationError) {
                throw error;
            }
            throw new app_error_1.ShapeCreationError(`Invalid line for Tetrahedron: ${error.message}`);
        }
        const parts = line.trim().split(/\s+/);
        const id = parts[0];
        const coords = [];
        for (let i = 1; i < parts.length; i += 1) {
            const value = Number(parts[i]);
            coords.push(value);
        }
        const points = [];
        for (let i = 0; i < 12; i += 3) {
            const x = coords[i];
            const y = coords[i + 1];
            const z = coords[i + 2];
            const point = new point_1.Point(x, y, z);
            points.push(point);
        }
        const tetrahedron = new tetrahedron_1.Tetrahedron(id, points);
        return tetrahedron;
    }
}
exports.TetrahedronFactory = TetrahedronFactory;
