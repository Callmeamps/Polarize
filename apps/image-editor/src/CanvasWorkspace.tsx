import React, { useState, useRef, useEffect } from "react";

export interface CanvasViewport {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export interface CanvasWorkspaceProps {
  width?: number;
  height?: number;
  maxScale?: number;
  minScale?: number;
  gridSize?: number;
  onViewportChange?: (viewport: CanvasViewport) => void;
}

/**
 * CanvasWorkspace: Container for DOM-based layers with pan/zoom + grid background
 * 
 * Layers are absolute-positioned divs inside a transform-based viewport.
 * Keyboard: Space+drag to pan, scroll to zoom
 */
export const CanvasWorkspace = React.forwardRef<
  HTMLDivElement,
  CanvasWorkspaceProps & { children?: React.ReactNode }
>(
  (
    {
      width = 1920,
      height = 1080,
      maxScale = 4,
      minScale = 0.1,
      gridSize = 20,
      onViewportChange,
      children,
    },
    ref
  ) => {
    const [viewport, setViewport] = useState<CanvasViewport>({
      scale: 1,
      offsetX: 0,
      offsetY: 0,
    });

    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const spaceHeldRef = useRef(false);
    const workspaceRef = useRef<HTMLDivElement>(null);

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(workspaceRef.current);
        } else {
          ref.current = workspaceRef.current;
        }
      }
    }, [ref]);

    // Handle wheel zoom — uses viewportRef to avoid stale closure
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = workspaceRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const vp = viewportRef.current;

      // Convert mouse position to canvas coordinates (pre-transform)
      const canvasX = (mouseX - vp.offsetX) / vp.scale;
      const canvasY = (mouseY - vp.offsetY) / vp.scale;

      // New scale
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(minScale, Math.min(maxScale, vp.scale * delta));

      // Recalculate offset to keep mouse point steady
      const newOffsetX = mouseX - canvasX * newScale;
      const newOffsetY = mouseY - canvasY * newScale;

      const newViewport = {
        scale: newScale,
        offsetX: newOffsetX,
        offsetY: newOffsetY,
      };

      setViewport(newViewport);
      onViewportChange?.(newViewport);
    };

    // Space+drag to pan (Space tracked via keydown, pan on mousedown)
    const handleMouseDown = (e: React.MouseEvent) => {
      if (spaceHeldRef.current || e.button === 1) {
        e.preventDefault();
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isPanning) return;

      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;

      const newViewport = {
        ...viewport,
        offsetX: viewport.offsetX + dx,
        offsetY: viewport.offsetY + dy,
      };

      setViewport(newViewport);
      onViewportChange?.(newViewport);
      setPanStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsPanning(false);
    };

    // Track Space key for pan
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Space") {
          e.preventDefault();
          spaceHeldRef.current = true;
        }
      };
      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === "Space") {
          spaceHeldRef.current = false;
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, []);

    // Wheel zoom — reattach when viewport bounds change
    const viewportRef = useRef(viewport);
    viewportRef.current = viewport;

    useEffect(() => {
      const el = workspaceRef.current;
      if (!el) return;

      const onWheel = (e: WheelEvent) => handleWheel(e);
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }, [minScale, maxScale]);

    return (
      <div
        ref={workspaceRef}
        className="canvas-workspace"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: `
            linear-gradient(45deg, #f5f5f5 25%, transparent 25%),
            linear-gradient(-45deg, #f5f5f5 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #f5f5f5 75%),
            linear-gradient(-45deg, transparent 75%, #f5f5f5 75%)
          `,
          backgroundSize: `${gridSize * 2}px ${gridSize * 2}px`,
          backgroundPosition: `0 0, 0 0, -${gridSize}px -${gridSize}px, -${gridSize}px -${gridSize}px`,
          backgroundColor: "#fafafa",
          cursor: isPanning ? "grabbing" : "default",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Canvas viewport layer */}
        <div
          className="canvas-viewport"
          style={{
            position: "absolute",
            width,
            height,
            transform: `translate(${viewport.offsetX}px, ${viewport.offsetY}px) scale(${viewport.scale})`,
            transformOrigin: "0 0",
            left: 0,
            top: 0,
          }}
        >
          {/* Layer container */}
          <div
            className="layer-container"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: "white",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

CanvasWorkspace.displayName = "CanvasWorkspace";
