import { Tool } from '../canvas/models'
import type { Action, Color, Toolbar } from './types'
const actions: Action[] = [
  {
    id: "rect-btn",
    name: "Rectangle",
    trigger: Tool.RECT
  },
  {
    id: "pointer-btn",
    name: "Pointer",
    trigger: Tool.POINTER
  },
]

const colors: Color[] = [
  {
    id: "red-color-btn",
    name: "red",
    hex: "#f00"
  },
  {
    id: "green-color-btn",
    name: "green",
    hex: "#0f0"
  },
  {
    id: "blue-color-btn",
    name: "blue",
    hex: "#00f"
  },
]

export const toolbar: Toolbar = {
  actions,
  colors
}
