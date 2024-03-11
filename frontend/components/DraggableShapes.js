import { useState } from 'react';
import { Layer, Star, Circle, Rect, Text } from 'react-konva';

export default function DraggableShapes() {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState('Rect');

  const addShape = () => {
    const newShape = {
      id: shapes.length.toString(),
      type: selectedShape,
      x: Math.random() * window.innerWidth * 0.8, // Avoid adding shapes too close to the edge
      y: Math.random() * window.innerHeight * 0.8,
      rotation: Math.random() * 180,
    };
    setShapes([...shapes, newShape]);
  };

  const shapeComponents = shapes.map((shape) => {
    if (shape.type === 'Star') {
      return (
        <Star
          key={shape.id}
          x={shape.x}
          y={shape.y}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          fill="#89b717"
          draggable
          rotation={shape.rotation}
        />
      );
    } else if (shape.type === 'Rect') {
      return (
        <Rect
          key={shape.id}
          x={shape.x}
          y={shape.y}
          width={50}
          height={50}
          fill="#00D2FF"
          draggable
          rotation={shape.rotation}
        />
      );
    }
  });
  return (
    <>
    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
        <label>
          Shape:
          <select value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)}>
            <option value="Star">Star</option>
            <option value="Rect">Rectangle</option>
          </select>
        </label>
        <button onClick={addShape}>Add Shape</button>
      </div>
      <Layer>
        {shapeComponents}
      </Layer>
    </>
  )
}
