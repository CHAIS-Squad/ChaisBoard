import dynamic from 'next/dynamic';
import { Stage, Layer, Line, Rect, Text } from 'react-konva';
import { useState, useEffect, useRef } from 'react';

export default function Whiteboard({ width, height }) {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    const updateDimensions = () => {
      // Update state if necessary or perform any action on resize
    };

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    setLines([...lines, []]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const newLines = lines.slice(0);
    const currentLine = newLines[newLines.length - 1].concat([
      point.x,
      point.y,
    ]);
    newLines[newLines.length - 1] = currentLine;

    setLines(newLines);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div>
      <Stage
        width={width || window.innerWidth}
        height={height || window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Rect x={20} y={20} width={50} height={50} fill='red' />
          {/* Existing lines drawing logic */}
        </Layer>
        <Layer>
          {lines.map((line, i) => (
            <Line key={i} points={line} stroke='black' strokeWidth={5} />
          ))}
        </Layer>
        
      </Stage>
    </div>
  );
}
