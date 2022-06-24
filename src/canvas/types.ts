import { Tool, MouseState, Point, Size } from './models'

interface CanvasState {
  tool: Tool,
  mouse: MouseState,
  color: string, 
}

interface CanvasConfig {
  nodeId: string,
  width: number,
  height: number
}

interface CanvasApp {
  canvas: HTMLCanvasElement | null,
  ctx: CanvasRenderingContext2D | null, // 2d support only
  lastRendered: number,
  shapes: Shape[],
  previews: Shape[],
  requestAnimationId: number | undefined,
}

interface Shape {
  origin: Point;
  size: Size;
  conf: Object;
  draw(ctx: CanvasRenderingContext2D | null): void;
}

export type {
  CanvasState,
  CanvasConfig,
  CanvasApp,
  Shape
};
