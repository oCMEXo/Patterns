"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrahedronService = void 0;
const tetrahedron_1 = require("../entities/tetrahedron");
const point_1 = require("../entities/point");
const calculation_validator_1 = require("../validators/calculation-validator");
class TetrahedronService {
    computeSurfaceArea(t) {
        const [a, b, c, d] = t.getPoints();
        const areaABC = this.computeTriangleArea(a, b, c);
        const areaABD = this.computeTriangleArea(a, b, d);
        const areaACD = this.computeTriangleArea(a, c, d);
        const areaBCD = this.computeTriangleArea(b, c, d);
        const area = areaABC + areaABD + areaACD + areaBCD;
        calculation_validator_1.CalculationValidator.validatePositive(area, 'surface area');
        return area;
    }
    computeVolume(t) {
        const [a, b, c, d] = t.getPoints();
        const ab = this.sub(b, a);
        const ac = this.sub(c, a);
        const ad = this.sub(d, a);
        const cross = this.cross(ac, ad);
        const triple = this.dot(ab, cross);
        const volume = Math.abs(triple) / 6;
        calculation_validator_1.CalculationValidator.validatePositive(volume, 'volume');
        return volume;
    }
    computeVolumeRatioByPlane(t, plane) {
        const points = t.getPoints();
        const totalVolume = this.computeVolume(t);
        const values = points.map((p) => {
            if (plane === 'XY') {
                return p.z;
            }
            if (plane === 'YZ') {
                return p.x;
            }
            return p.y;
        });
        const positives = [];
        const negatives = [];
        for (let i = 0; i < values.length; i += 1) {
            if (values[i] > 0) {
                positives.push(i);
            }
            else if (values[i] < 0) {
                negatives.push(i);
            }
        }
        if (positives.length === 0 || negatives.length === 0) {
            return Infinity;
        }
        if (positives.length === 1 && negatives.length === 3) {
            return this.computeCutRatio(points, positives[0], negatives, plane, totalVolume);
        }
        if (negatives.length === 1 && positives.length === 3) {
            return this.computeCutRatio(points, negatives[0], positives, plane, totalVolume);
        }
        return 1;
    }
    computeCutRatio(points, singleIndex, otherIndices, plane, totalVolume) {
        const apex = points[singleIndex];
        const others = otherIndices.map((i) => points[i]);
        const intersections = [];
        for (let i = 0; i < others.length; i += 1) {
            const edgePoint = others[i];
            const t = this.computeIntersectionT(apex, edgePoint, plane);
            const intersection = this.interpolate(apex, edgePoint, t);
            intersections.push(intersection);
        }
        const smallTetra = new tetrahedron_1.Tetrahedron('cut', [apex, intersections[0], intersections[1], intersections[2]]);
        const smallVolume = this.computeVolume(smallTetra);
        calculation_validator_1.CalculationValidator.validateNonNegative(smallVolume, 'small volume after cut');
        const restVolume = totalVolume - smallVolume;
        calculation_validator_1.CalculationValidator.validateNonNegative(restVolume, 'rest volume after cut');
        if (restVolume === 0) {
            return Infinity;
        }
        return smallVolume / restVolume;
    }
    computeIntersectionT(a, b, plane) {
        if (plane === 'XY') {
            return a.z / (a.z - b.z);
        }
        if (plane === 'YZ') {
            return a.x / (a.x - b.x);
        }
        return a.y / (a.y - b.y);
    }
    interpolate(a, b, t) {
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        const z = a.z + (b.z - a.z) * t;
        return new point_1.Point(x, y, z);
    }
    computeTriangleArea(a, b, c) {
        const ab = this.sub(b, a);
        const ac = this.sub(c, a);
        const cross = this.cross(ab, ac);
        const area = 0.5 * Math.sqrt(cross.x * cross.x + cross.y * cross.y + cross.z * cross.z);
        return area;
    }
    sub(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        };
    }
    cross(u, v) {
        return {
            x: u.y * v.z - u.z * v.y,
            y: u.z * v.x - u.x * v.z,
            z: u.x * v.y - u.y * v.x
        };
    }
    dot(u, v) {
        return u.x * v.x + u.y * v.y + u.z * v.z;
    }
}
exports.TetrahedronService = TetrahedronService;
