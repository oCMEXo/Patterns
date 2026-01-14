"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tetrahedron_file_reader_1 = require("./readers/tetrahedron-file-reader");
const tetrahedron_validator_1 = require("./validators/tetrahedron-validator");
const tetrahedron_service_1 = require("./services/tetrahedron-service");
const logger_1 = require("./logger");
const app_error_1 = require("./errors/app-error");
function main() {
    const reader = new tetrahedron_file_reader_1.TetrahedronFileReader('./data/tetrahedrons.txt');
    const service = new tetrahedron_service_1.TetrahedronService();
    try {
        const tetrahedrons = reader.readAll();
        logger_1.logger.info({ count: tetrahedrons.length }, 'Successfully read tetrahedrons');
        tetrahedrons.forEach((t) => {
            try {
                tetrahedron_validator_1.TetrahedronValidator.validateTetrahedron(t);
                const area = service.computeSurfaceArea(t);
                const volume = service.computeVolume(t);
                const ratioXY = service.computeVolumeRatioByPlane(t, 'XY');
                logger_1.logger.info({
                    id: t.id,
                    area,
                    volume,
                    ratioXY,
                    baseOnPlane: tetrahedron_validator_1.TetrahedronValidator.isBaseOnCoordinatePlane(t)
                }, 'Tetrahedron calculations');
            }
            catch (error) {
                if (error instanceof app_error_1.AppError) {
                    logger_1.logger.error({ id: t.id, error }, 'Validation or calculation error for tetrahedron');
                }
                else {
                    logger_1.logger.error({ id: t.id, error }, 'Unexpected error for tetrahedron');
                }
            }
        });
    }
    catch (error) {
        if (error instanceof app_error_1.AppError) {
            logger_1.logger.error({ error }, 'Application error');
        }
        else {
            logger_1.logger.error({ error }, 'Unexpected fatal error');
        }
    }
}
main();
