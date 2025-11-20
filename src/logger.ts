import pino from 'pino';
import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve('logs');
const LOG_FILE_PATH = path.join(LOG_DIR, 'app.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const streams = [
  { stream: process.stdout },
  { stream: pino.destination(LOG_FILE_PATH) },
];

export const logger = pino(
  {
    level: 'info',
  },
  pino.multistream(streams),
);
