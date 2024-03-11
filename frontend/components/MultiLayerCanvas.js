import React, { useState, useRef } from 'react';
import { Stage, Rect, Circle, Star } from 'react-konva';
import dynamic from 'next/dynamic';

const Whiteboard = dynamic(() => import('../components/Whiteboard'), {
  ssr: false,
});
const DraggableShapes = dynamic(() => import('../components/DraggableShapes'), {
  ssr: false,
});

export default function MultiLayerCanvas() {
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState('Rect');
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    // Check if the event target is the Stage to only start drawing if clicking on empty space
    if (e.target === e.target.getStage()) {
      isDrawing.current = true;
      setLines([...lines, []]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    if (lastLine) {
      lastLine = [...lastLine, point.x, point.y];
      setLines(lines.slice(0, -1).concat([lastLine]));
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // Function to add a new shape based on the selected type
  const addShape = () => {
    const newShape = {
      id: `${selectedShape}-${shapes.length}`, // Use selectedShape instead of selectedShapeType
      shapeType: selectedShape, // This correctly refers to the state variable holding the selected shape type
      x: Math.random() * window.innerWidth * 0.8,
      y: Math.random() * window.innerHeight * 0.8,
      rotation: Math.random() * 180,
      isDragging: false, // Initial dragging state is false
    };
    setShapes([...shapes, newShape]);
  };
  

  const width = window.innerWidth; // Consider using useState and useEffect for dynamic resizing
  const height = window.innerHeight;

  const handleDragStart = (shapeId) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        return { ...shape, isDragging: true };
      }
      return shape;
    });
    setShapes(updatedShapes);
  };

  const handleDragEnd = (shapeId, newPos) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        return { ...shape, ...newPos, isDragging: false };
      }
      return shape;
    });
    setShapes(updatedShapes);
  };

  return (
    <>
      <div style={{ position: 'absolute', zIndex: 1 }}>
        <select
          onChange={(e) => setSelectedShape(e.target.value)}
          value={selectedShape}
        >
          <option value='Star'>Star</option>
          <option value='Circle'>Circle</option>
          <option value='Rect'>Rectangle</option>
        </select>
        <button onClick={addShape}>Add Shape</button>
      </div>

      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Whiteboard lines={lines} />
        <DraggableShapes
          shapes={shapes}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </Stage>
    </>
  );
}
