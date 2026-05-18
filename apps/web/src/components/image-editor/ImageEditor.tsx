import { useState, useRef } from 'react';
import { EditorProvider, useEditor } from './editorContext';
import type { Layer, Tool } from './types';
import type { Project } from '@open-design/contracts';
import { navigate } from '../../router';

function generateId(): string {
  return `layer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function Toolbar() {
  const { state, dispatch } = useEditor();
  const tools: { id: Tool; label: string; key: string }[] = [
    { id: 'select', label: 'Select (V)', key: 'V' },
    { id: 'rect', label: 'Rectangle (R)', key: 'R' },
    { id: 'ellipse', label: 'Ellipse (O)', key: 'O' },
    { id: 'text', label: 'Text (T)', key: 'T' },
    { id: 'image', label: 'Image (I)', key: 'I' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: 4,
      padding: 8,
      background: '#1e1e1e',
      borderBottom: '1px solid #333',
    }}>
      {tools.map(tool => (
        <button
          key={tool.id}
          onClick={() => dispatch({ type: 'SET_TOOL', tool: tool.id })}
          style={{
            padding: '6px 12px',
            background: state.activeTool === tool.id ? '#3b82f6' : '#2d2d2d',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          {tool.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button
        onClick={() => dispatch({ type: 'UNDO' })}
        style={{ padding: '6px 12px', background: '#2d2d2d', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
      >
        Undo (Ctrl+Z)
      </button>
      <button
        onClick={() => dispatch({ type: 'REDO' })}
        style={{ padding: '6px 12px', background: '#2d2d2d', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
      >
        Redo (Ctrl+Y)
      </button>
    </div>
  );
}

function Canvas() {
  const { state, dispatch } = useEditor();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (state.activeTool === 'select') {
      dispatch({ type: 'DESELECT_ALL' });
      return;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / state.zoom;
    const y = (e.clientY - rect.top) / state.zoom;

    const newLayer: Layer = {
      id: generateId(),
      type: state.activeTool,
      name: `${state.activeTool} layer`,
      visible: true,
      locked: false,
      x,
      y,
      width: state.activeTool === 'text' ? 200 : 100,
      height: state.activeTool === 'text' ? 40 : 100,
      rotation: 0,
      opacity: 1,
      styles: {
        fill: state.activeTool === 'rect' ? '#3b82f6' : state.activeTool === 'ellipse' ? '#10b981' : 'transparent',
        stroke: state.activeTool === 'text' ? '#000' : 'transparent',
        'font-size': state.activeTool === 'text' ? '16px' : '0',
        color: '#fff',
      },
      content: state.activeTool === 'text' ? { text: 'Hello' } : undefined,
    };

    dispatch({ type: 'ADD_LAYER', layer: newLayer });
  };

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0a0a0a',
        cursor: state.activeTool !== 'select' ? 'crosshair' : 'default',
        overflow: 'auto',
        backgroundImage: 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      }}
    >
      <div
        style={{
          width: state.canvasWidth * state.zoom,
          height: state.canvasHeight * state.zoom,
          transform: `scale(${state.zoom})`,
          transformOrigin: 'top left',
          position: 'relative',
        }}
      >
        {state.layers.map(layer => (
          <div
            key={layer.id}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'SELECT_LAYER', id: layer.id });
            }}
            style={{
              position: 'absolute',
              left: layer.x,
              top: layer.y,
              width: layer.width,
              height: layer.height,
              backgroundColor: layer.styles.fill || 'transparent',
              border: layer.styles.stroke !== 'transparent' ? `2px solid ${layer.styles.stroke}` : `2px solid ${state.selectedLayerIds.includes(layer.id) ? '#3b82f6' : 'transparent'}`,
              borderRadius: layer.type === 'ellipse' ? '50%' : 0,
              opacity: layer.opacity,
              transform: `rotate(${layer.rotation}deg)`,
              display: layer.visible ? 'block' : 'none',
              cursor: 'move',
              userSelect: 'none',
              color: layer.styles.color,
              fontSize: layer.styles['font-size'] || '16px',
              textAlign: layer.content?.textAlign as 'left' | 'center' | 'right' | undefined,
              fontWeight: layer.content?.fontWeight as string | undefined,
              fontFamily: layer.content?.fontFamily as string | undefined,
            }}
          >
            {layer.content?.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function LayerPanel() {
  const { state, dispatch } = useEditor();

  return (
    <div style={{
      width: 240,
      background: '#1e1e1e',
      borderLeft: '1px solid #333',
      overflow: 'auto',
      fontSize: 12,
      color: '#fff',
    }}>
      <div style={{ padding: 8, borderBottom: '1px solid #333' }}>
        Layers ({state.layers.length})
      </div>
      {state.layers.map(layer => (
        <div
          key={layer.id}
          onClick={() => dispatch({ type: 'SELECT_LAYER', id: layer.id })}
          style={{
            padding: '6px 8px',
            borderBottom: '1px solid #2a2a2a',
            background: state.selectedLayerIds.includes(layer.id) ? '#2d2d2d' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ opacity: layer.visible ? 1 : 0.3 }}>👁</span>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {layer.name}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'REMOVE_LAYER', id: layer.id });
            }}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

function PropertiesPanel() {
  const { state, dispatch } = useEditor();
  const layer = state.layers.find(l => l.id === state.selectedLayerIds[0]);

  if (!layer) {
    return (
      <div style={{
        width: 260,
        background: '#1e1e1e',
        borderLeft: '1px solid #333',
        padding: 8,
        fontSize: 12,
        color: '#666',
      }}>
        Select a layer to edit properties
      </div>
    );
  }

  const updateLayer = (updates: Partial<Layer>) => {
    dispatch({ type: 'UPDATE_LAYER', id: layer.id, updates });
  };

  return (
    <div style={{
      width: 260,
      background: '#1e1e1e',
      borderLeft: '1px solid #333',
      overflow: 'auto',
      fontSize: 12,
      color: '#fff',
    }}>
      <div style={{ padding: 8, borderBottom: '1px solid #333', fontWeight: 'bold' }}>
        {layer.name}
      </div>
      <div style={{ padding: 8 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>X</label>
        <input
          type="number"
          value={Math.round(layer.x)}
          onChange={(e) => updateLayer({ x: Number(e.target.value) })}
          style={{ width: '100%', padding: 4, background: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: 4 }}
        />
        <label style={{ display: 'block', marginBottom: 4, marginTop: 8 }}>Y</label>
        <input
          type="number"
          value={Math.round(layer.y)}
          onChange={(e) => updateLayer({ y: Number(e.target.value) })}
          style={{ width: '100%', padding: 4, background: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: 4 }}
        />
        <label style={{ display: 'block', marginBottom: 4, marginTop: 8 }}>Width</label>
        <input
          type="number"
          value={Math.round(layer.width)}
          onChange={(e) => updateLayer({ width: Number(e.target.value) })}
          style={{ width: '100%', padding: 4, background: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: 4 }}
        />
        <label style={{ display: 'block', marginBottom: 4, marginTop: 8 }}>Height</label>
        <input
          type="number"
          value={Math.round(layer.height)}
          onChange={(e) => updateLayer({ height: Number(e.target.value) })}
          style={{ width: '100%', padding: 4, background: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: 4 }}
        />
        <label style={{ display: 'block', marginBottom: 4, marginTop: 8 }}>Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={layer.opacity}
          onChange={(e) => updateLayer({ opacity: Number(e.target.value) })}
          style={{ width: '100%' }}
        />
        {layer.type === 'rect' && (
          <>
            <label style={{ display: 'block', marginBottom: 4, marginTop: 8 }}>Fill</label>
            <input
              type="color"
              value={layer.styles.fill === 'transparent' ? '#000000' : layer.styles.fill}
              onChange={(e) => updateLayer({ styles: { ...layer.styles, fill: e.target.value } })}
              style={{ width: '100%', height: 30 }}
            />
          </>
        )}
        {layer.content?.text && (
          <>
            <label style={{ display: 'block', marginBottom: 4, marginTop: 8 }}>Text</label>
            <textarea
              value={layer.content.text}
              onChange={(e) => updateLayer({ content: { ...layer.content!, text: e.target.value } })}
              style={{ width: '100%', padding: 4, background: '#2d2d2d', color: '#fff', border: '1px solid #444', borderRadius: 4 }}
              rows={2}
            />
          </>
        )}
      </div>
    </div>
  );
}

interface ImageEditorProps {
  project?: Project;
}

export function ImageEditor({ project }: ImageEditorProps) {
  return (
    <EditorProvider>
      <ImageEditorInner project={project} />
    </EditorProvider>
  );
}

function ImageEditorInner({ project }: ImageEditorProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#121212',
      color: '#fff',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        background: '#1e1e1e',
        borderBottom: '1px solid #333',
        gap: 12,
      }}>
        <button
          onClick={() => navigate({ kind: 'project', projectId: project?.id ?? '', fileName: null })}
          style={{
            padding: '6px 12px',
            background: '#2d2d2d',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          ← Back to Project
        </button>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>
          {project?.name ?? 'Image Editor'}
        </h2>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Toolbar />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}
