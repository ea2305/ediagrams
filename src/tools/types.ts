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

export type {
  Action,
  Color,
  Toolbar
}