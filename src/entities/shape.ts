import { Point } from './point';
import { Observer } from '../observers/observer';

export abstract class Shape {
  public readonly id: string;

  public readonly name: string;

  protected points: Point[];

  private observers: Observer<Shape>[] = [];

  protected constructor(id: string, name: string, points: Point[]) {
    this.id = id;
    this.name = name;
    this.points = points;
  }

  public getPoints(): Point[] {
    return [...this.points];
  }

  public attachObserver(observer: Observer<Shape>): void {
    this.observers.push(observer);
  }

  public detachObserver(observer: Observer<Shape>): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  protected notifyObservers(): void {
    this.observers.forEach((o) => o.update(this));
  }
}
