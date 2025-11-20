import { Point } from './point';

export abstract class Shape {
  public readonly id: string;

  public readonly name: string;

  protected readonly points: Point[];

  protected constructor(id: string, name: string, points: Point[]) {
    this.id = id;
    this.name = name;
    this.points = points;
  }

  public getPoints(): Point[] {
    return this.points;
  }
}
