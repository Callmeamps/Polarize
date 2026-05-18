import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { EditorState, EditorAction, Layer } from './types';

const initialState: EditorState = {
  layers: [],
  selectedLayerIds: [],
  activeTool: 'select',
  canvasWidth: 2048,
  canvasHeight: 2048,
  zoom: 1,
  panX: 0,
  panY: 0,
  history: [[]],
  historyIndex: 0,
};

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'ADD_LAYER':
      return {
        ...state,
        layers: [...state.layers, action.layer],
        selectedLayerIds: [action.layer.id],
      };
    case 'REMOVE_LAYER':
      return {
        ...state,
        layers: state.layers.filter(l => l.id !== action.id),
        selectedLayerIds: state.selectedLayerIds.filter(id => id !== action.id),
      };
    case 'UPDATE_LAYER':
      return {
        ...state,
        layers: state.layers.map(l =>
          l.id === action.id ? { ...l, ...action.updates } : l
        ),
      };
    case 'SELECT_LAYER':
      return {
        ...state,
        selectedLayerIds: [action.id],
      };
    case 'DESELECT_ALL':
      return {
        ...state,
        selectedLayerIds: [],
      };
    case 'SET_TOOL':
      return {
        ...state,
        activeTool: action.tool,
      };
    case 'SET_ZOOM':
      return {
        ...state,
        zoom: Math.max(0.1, Math.min(5, action.zoom)),
      };
    case 'SET_PAN':
      return {
        ...state,
        panX: action.x,
        panY: action.y,
      };
    case 'UNDO':
      if (state.historyIndex > 0) {
        const prevLayers = state.history[state.historyIndex - 1];
        if (prevLayers) {
          return {
            ...state,
            layers: prevLayers,
            historyIndex: state.historyIndex - 1,
          };
        }
      }
      return state;
    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        const nextLayers = state.history[state.historyIndex + 1];
        if (nextLayers) {
          return {
            ...state,
            layers: nextLayers,
            historyIndex: state.historyIndex + 1,
          };
        }
      }
      return state;
    default:
      return state;
  }
}

interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
}
