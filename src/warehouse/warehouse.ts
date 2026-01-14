export type ShapeMetrics = {
  area: number;
  volume: number;
  perimeter: number;
};

export class Warehouse {
  private static instance: Warehouse;

  private metrics = new Map<string, ShapeMetrics>();

  private constructor() {}

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  public set(id: string, value: ShapeMetrics): void {
    this.metrics.set(id, value);
  }

  public get(id: string): ShapeMetrics | undefined {
    return this.metrics.get(id);
  }

  public has(id: string): boolean {
    return this.metrics.has(id);
  }

  public remove(id: string): void {
    this.metrics.delete(id);
  }

  public clear(): void {
    this.metrics.clear();
  }
}
