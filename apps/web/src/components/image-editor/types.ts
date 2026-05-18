export interface Layer {
  id: string;
  type: 'rect' | 'text' | 'image' | 'ellipse' | 'canvas' | 'group';
  name: string;
  visible: boolean;
  locked: boolean;
  parentId?: string;
  children?: Layer[];
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  styles: Record<string, string>;
  content?: {
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontWeight?: string;
    fontStyle?: string;
    imageUrl?: string;
    canvasDataUrl?: string;
  };
  filter?: {
    blur?: number;
    dropShadow?: {
      x: number;
      y: number;
      blur: number;
      color: string;
    };
  };
}

export type Tool = 'select' | 'rect' | 'ellipse' | 'text' | 'image' | 'canvas';

export interface EditorState {
  layers: Layer[];
  selectedLayerIds: string[];
  activeTool: Tool;
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  panX: number;
  panY: number;
  history: Layer[][];
  historyIndex: number;
}

export type EditorAction =
  | { type: 'ADD_LAYER'; layer: Layer }
  | { type: 'REMOVE_LAYER'; id: string }
  | { type: 'UPDATE_LAYER'; id: string; updates: Partial<Layer> }
  | { type: 'SELECT_LAYER'; id: string }
  | { type: 'DESELECT_ALL' }
  | { type: 'SET_TOOL'; tool: Tool }
  | { type: 'SET_ZOOM'; zoom: number }
  | { type: 'SET_PAN'; x: number; y: number }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'GROUP_LAYERS'; ids: string[] }
  | { type: 'UNGROUP_LAYER'; id: string };
