import fs from 'fs';
import path from 'path';
import { Tetrahedron } from '../entities/tetrahedron';
import { TetrahedronFactory } from '../factories/tetrahedron-factory';
import { FileReadError } from '../errors/app-error';
import { logger } from '../logger';

export class TetrahedronFileReader {
  private readonly filePath: string;

  constructor(relativePath: string) {
    this.filePath = path.resolve(relativePath);
  }

  public readAll(): Tetrahedron[] {
    const tetrahedrons: Tetrahedron[] = [];
    let content: string;

    try {
      content = fs.readFileSync(this.filePath, 'utf-8');
    } catch (error) {
      logger.error({ err: error }, 'Failed to read file');
      throw new FileReadError(`Failed to read file at ${this.filePath}`);
    }

    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      const rawLine = lines[i];
      if (!rawLine.trim()) {
        continue;
      }
      try {
        const tetra = TetrahedronFactory.createFromLine(rawLine);
        tetrahedrons.push(tetra);
      } catch (error) {
        logger.warn(
          { lineNumber: i + 1, line: rawLine, err: error },
          'Skipping invalid line'
        );
      }
    }

    return tetrahedrons;
  }
}
