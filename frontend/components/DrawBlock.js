import React, { useState } from 'react';
import { Stage, Layer, Text, Rect, Group, Line } from 'react-konva';
import Whiteboard from './Whiteboard';

export default function CanvasBlock() {
  const [lines, setLines] = useState([]);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const cardWidth = 300;
  const cardHeight = 200;

  const handleDragMove = (e) => {
    setPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleMouseDown = () => {
    // Start a new line when the mouse is pressed
    setLines([...lines, []]);
  };

  const handleMouseMove = (e) => {
    // Add points to the last line when the mouse is moved
    const point = e.target.getStage().getPointerPosition();
    let lastLine = lines[lines.length - 1];
    if (lastLine) {
      lastLine = [...lastLine, point.x, point.y];
      setLines(lines.slice(0, -1).concat([lastLine]));
    }
  };


  return (
    <>
      <Layer>
        <Group x={position.x} y={position.y} draggable onDragMove={handleDragMove}>
          {/* Card Background */}
          <Rect width={cardWidth} height={cardHeight} fill="#f0f0f0" cornerRadius={10} />
        </Group>
      </Layer>
      <Layer>
        {/* Drawing (Whiteboard) */}
        <Line
          points={lines.flat()}
          stroke="black"
          strokeWidth={5}
          lineCap="round"
          lineJoin="round"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        />
      </Layer>
    </>
  );
};