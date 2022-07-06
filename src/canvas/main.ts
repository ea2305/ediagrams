import { Tool, MouseState, Rect, Size, Point } from "./models";
import type { CanvasState, CanvasConfig, Shape, CanvasApp } from "./types";
import { getPosFromClickEvent, getSizeFromClickEvent } from "./mouseHandler";

export class Canvas {
  state: CanvasState;
  config: CanvasConfig;
  app: CanvasApp;

  constructor(config?: CanvasConfig) {
    this.state = {
      tool: Tool.RECT,
      mouse: MouseState.IDLE,
      color: "",
    };
    this.config = config || {
      nodeId: "canvas",
      width: 300,
      height: 300,
    };
    this.app = {
      canvas: null,
      ctx: null,
      lastRendered: 0,
      shapes: [],
      previews: [],
      edit: [],
      requestAnimationId: undefined,
    };
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

  checkShapesClick(pos: Point) {
    // reset config
    this.app.edit.forEach(shape => {
      shape.conf.edit = false;
    })
    this.app.edit = [];

    const matches = this.app.shapes.filter(shape => {
      return shape.clickOver(pos);
    });
    const top = matches[matches.length - 1];

    // validates undefined value (click in empty space)
    if (!top) {
      return;
    }

    // update shape to edit mode.
    top.conf.edit = true;
    this.app.edit.push(top)
  }

  mouseDown(event: MouseEvent) {
    this.state.mouse = MouseState.DOWN;
    if (!this.app.canvas) {
      throw new Error("[mouse-down] canvas not found");
    }
    const origin = getPosFromClickEvent(event, this.app.canvas);

    // validate click inside drew shape
    this.checkShapesClick(origin);

    // TODO generate options with configuration
    const config = {
      line: 1,
      filled: true,
      fillStyle: "red",
      strokeLine: "blue",
      track: false,
    };

    // TODO implement all shapes
    const shape = new Rect(origin, new Size(), config);
    this.app.previews.push(shape);
  }
  mouseUp(event: MouseEvent) {
    if (!this.app.canvas) {
      throw new Error("[mouse-up] canvas not found");
    }
    this.state.mouse = MouseState.UP;
    this.update(event, this.app.canvas);
    this.app.previews.pop(); // remove last reference of drew element
  }
  mouseMove(event: MouseEvent) {
    if (this.state.mouse === MouseState.DOWN && this.app.previews.length) {
      let current = this.app.previews.pop();
      if (current && this.app.canvas) {
        const size = getSizeFromClickEvent(event, current, this.app.canvas);
        current.size = size;
        this.app.previews.push(current);
      }
    }
  }
  update(event: MouseEvent, canvas: HTMLCanvasElement) {
    let [currentShape] = this.app.previews;
    const size = getSizeFromClickEvent(event, currentShape, canvas);

    let shape: Shape;
    switch (this.state.tool) {
      case Tool.RECT:
        shape = new Rect(currentShape.origin, size, currentShape.conf);
        this.app.shapes.push(shape);
      case Tool.NONE:
      default:
        break;
    }
  }
  initListeners(canvas: HTMLCanvasElement) {
    let isListening: boolean = Boolean(canvas.getAttribute("listening"));
    if (!isListening) {
      canvas.addEventListener("mousedown", this.mouseDown.bind(this));
      canvas.addEventListener("mouseup", this.mouseUp.bind(this));
      canvas.addEventListener("mousemove", this.mouseMove.bind(this));
      canvas.setAttribute("listening", "true");
    } else {
      console.log("listeners are defined and ready");
    }
  }
  /**
   * Get canvas instance and context ref.
   * @return boolean if transaction was successful
   */
  init(): boolean | never {
    const canvas = document.querySelector(
      `#${this.config.nodeId}`
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!canvas) {
      throw new Error("Canvas id was not found");
    }
    if (!ctx) {
      throw new Error("Context2D can not be extracted from canvas");
    }

    // connect event system
    this.initListeners(canvas);

    // store important components in the application
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
        app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
        app.shapes.forEach((shape) => shape.draw(app.ctx));
        app.previews.forEach((shape) => shape.draw(app.ctx));
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
    if (this.app.canvas) {
      this.app.canvas.removeEventListener(
        "mousedown",
        this.mouseDown.bind(this)
      );
      this.app.canvas.removeEventListener("mouseup", this.mouseUp.bind(this));
      this.app.canvas.removeEventListener(
        "mousemove",
        this.mouseMove.bind(this)
      );
    }
  }
}
