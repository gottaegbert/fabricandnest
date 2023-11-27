// src/FabricCanvas.tsx
import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

// extend fabric.Line id property
interface LineWithId extends fabric.Line {
  id?: string;
}

const FabricCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current);
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "black",
        width: 60,
        height: 30,
        angle: 0,
        strokeWidth: 0, // no border
      });

      fabricCanvas.add(rect);
      rect.on("modified", () => updateOutline(rect, fabricCanvas));
      updateOutline(rect, fabricCanvas);
    }
  }, []);

  const updateOutline = (obj: fabric.Object, fabricCanvas: fabric.Canvas) => {
    // Remove old outline
    fabricCanvas.getObjects().forEach((obj) => {
      if ((obj as LineWithId).id === "outline") {
        fabricCanvas.remove(obj);
      }
    });

    const oCoords = obj.oCoords;
    if (!oCoords) {
      return;
    }

    // Print the coordinates of the corners
    console.log("Corner coordinates:", {
      topLeft: { x: oCoords.tl.x, y: oCoords.tl.y },
      topRight: { x: oCoords.tr.x, y: oCoords.tr.y },
      bottomRight: { x: oCoords.br.x, y: oCoords.br.y },
      bottomLeft: { x: oCoords.bl.x, y: oCoords.bl.y },
    });

    // Define the points for the lines based on the oCoords
    const points = [oCoords.tl, oCoords.tr, oCoords.br, oCoords.bl];

    // Create lines between each corner point
    points.forEach((point, index) => {
      const nextPoint = points[(index + 1) % points.length];
      const line = new fabric.Line(
        [point.x, point.y, nextPoint.x, nextPoint.y],
        {
          stroke: "red",
          strokeWidth: 2,
          selectable: false,
          evented: false,
        }
      ) as LineWithId;

      line.id = "outline";
      fabricCanvas.add(line);
    });

    // Render the updated canvas
    fabricCanvas.renderAll();
  };

  return <canvas ref={canvasRef} id="canvas" width={1980} height={1280} />;
};

export default FabricCanvas;
