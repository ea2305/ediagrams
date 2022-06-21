interface Action {
  id: string;
  name: string;
}

interface Color {
  id: string;
  name: string;
  hex: string;
}

interface Toolbar {
  colors: Color[];
  actions: Action[];
}

const actions: Action[] = [
  {
    id: "rect-btn",
    name: "Rectangle"
  }
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
