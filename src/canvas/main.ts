import { Tool, MouseState } from './models'
import type { CanvasState, CanvasConfig, Shape, CanvasApp } from './types'

export class Canvas {

  state: CanvasState;
  config: CanvasConfig;
  app: CanvasApp;

  constructor(config?: CanvasConfig) {
    this.state = {
      tool: Tool.NONE,
      mouse: MouseState.IDLE,
      color: ""
    }
    this.config = config || {
      nodeId: 'canvas',
      width: 300,
      height: 300
    }
    this.app = {
      canvas: null,
      ctx: null,
      lastRendered: 0,
      shapes: [],
      requestAnimationId: undefined
    }
  }
  setConfig(config: CanvasConfig): void {
    this.config = config;
  }
  getState(): CanvasState {
    return this.state;
  }
  getConfig(): CanvasConfig {
    return this.config;
  }
  setMouseState(mouseState: MouseState): void {
    this.state.mouse = mouseState;
  }
  setToolState(toolState: Tool): void {
    this.state.tool = toolState;
  }
  /**
   * Verify if canvas is accessible and the context is available
   */
  check(): boolean {
    return Boolean(this.app.canvas && this.app.ctx);
  }
  /**
   * Get canvas instance and context ref.
   * @return boolean if transaction was successful
   */
  init(): boolean | never {
    const canvas = document.querySelector(`#${this.config.nodeId}`) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!canvas) {
      throw new Error('Canvas id was not found');
    }
    if (!ctx) {
      throw new Error('Context2D can not be extracted from canvas');
    }
    this.app.canvas = canvas;
    this.app.ctx = ctx;
    return true;
  }
  /**
   * Begin frame loop for canvas
   */
  begin(): void | never {
    const { app } = this;
    const { requestAnimationFrame } = window;
    function loop(time: number) {
      if (app.canvas && app.ctx) {
        app.ctx.clearRect(0, 0,
          app.canvas.width,
          app.canvas.height
        );
        app.shapes.forEach((shape) => shape.draw(app.ctx));
        app.lastRendered = time;
        requestAnimationFrame(loop);
      }
    }
    app.requestAnimationId = requestAnimationFrame(loop);
  }
  end(): void | never {
    if (this.app.requestAnimationId) {
      window.cancelAnimationFrame(this.app.requestAnimationId);
      this.app.requestAnimationId = undefined;
    }
  }
}