import React from "react";

export interface LayerProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity?: number;
  zIndex?: number;
  selected?: boolean;
  onSelect?: (id: string) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Layer: DOM-based layer with transform positioning
 * 
 * Uses transform for position/rotate to avoid layout thrashing.
 * Position is absolute within parent LayerContainer.
 */
export const Layer = React.forwardRef<HTMLDivElement, LayerProps>(
  (
    {
      id,
      x,
      y,
      width,
      height,
      rotation = 0,
      opacity = 1,
      zIndex = 0,
      selected = false,
      onSelect,
      style,
      children,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-layer-id={id}
        className={`layer ${selected ? "layer--selected" : ""}`}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width,
          height,
          opacity,
          zIndex,
          transform: `rotate(${rotation}deg)`,
          cursor: selected ? "move" : "pointer",
          ...style,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(id);
        }}
      >
        {children}

        {/* Selection outline */}
        {selected && (
          <div
            className="layer-selection-outline"
            style={{
              position: "absolute",
              inset: 0,
              border: "2px solid #0066ff",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    );
  }
);

Layer.displayName = "Layer";
