import type { Shape } from './types';

class Point {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}

class Size {
  h: number;
  w: number;
  constructor(h: number = 0, w: number = 0) {
    this.h = h;
    this.w = w;
  }
}

class Rect implements Shape {
  origin: Point;
  size: Size;
  conf: any;

  constructor(origin: Point = new Point(0,0), size: Size = new Size(0,0), conf: any = {}) {
    this.origin = origin;
    this.size = size;
    this.conf = conf;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      throw new Error('Context is not defined');
    }
    let cachefillStyle = ctx.fillStyle;
    ctx.beginPath();
    if (this.conf.line) {
      ctx.lineWidth = this.conf.line;
    }
    if (this.conf.strokeStyle) {
      ctx.strokeStyle = this.conf.strokeStyle;
    }
    if (this.conf.filled && this.conf.fillStyle) {
      ctx.fillStyle = this.conf.fillStyle;
    }
    ctx.fillRect(this.origin.x, this.origin.y, this.size.w, this.size.h);
    ctx.rect(this.origin.x, this.origin.y, this.size.w, this.size.h);
    ctx.stroke();

    ctx.fillStyle = cachefillStyle;
    if (this.conf.track) {
      // insert in the list after draw if need it
      console.log("[draw] rect:", origin);
    }
  }
}

// TODO implement new tools
enum Tool {
  NONE = 'NONE',
  RECT = 'RECT'
}

enum MouseState {
  IDLE = 'IDLE',
  DOWN = 'DOWN',
  UP = 'UP'
}

export {
  Point,
  Size,
  Rect,
  Tool,
  MouseState
}