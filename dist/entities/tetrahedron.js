"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tetrahedron = void 0;
const shape_1 = require("./shape");
class Tetrahedron extends shape_1.Shape {
    constructor(id, points) {
        super(id, 'Tetrahedron', points);
    }
}
exports.Tetrahedron = Tetrahedron;
