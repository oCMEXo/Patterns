"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
class Shape {
    constructor(id, name, points) {
        this.id = id;
        this.name = name;
        this.points = points;
    }
    getPoints() {
        return this.points;
    }
}
exports.Shape = Shape;
