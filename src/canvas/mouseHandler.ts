import { Point, Size } from './models'
import type { Shape } from './types'

function getCoordFromEvent(event: MouseEvent, canvas: HTMLCanvasElement) {
  let { x: offsetX, y: offsetY } = canvas.getBoundingClientRect();
  let { x, y } = event;
  return { x: x - offsetX, y: y - offsetY };
}

function getSizeFromClickEvent(event: MouseEvent, shape: Shape, canvas: HTMLCanvasElement) {
  let { x, y } = getCoordFromEvent(event, canvas);

  const size = new Size(
    y - shape.origin.y,   // height
    x - shape.origin.x    // width
  );
  return size;
}

function getPosFromClickEvent(event: MouseEvent, canvas: HTMLCanvasElement) {
  let { x, y } = getCoordFromEvent(event, canvas);
  const point = new Point(x, y);
  return point;
}

export {
  getCoordFromEvent,
  getPosFromClickEvent,
  getSizeFromClickEvent
}