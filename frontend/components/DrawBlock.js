import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Group, Line, Text, Transformer } from 'react-konva';

const DrawBlock = ({
  id,
  position,
  lines,
  saveHistory,
  onCreate,
  onDragStart,
  onDragEnd,
  updateLocalLines,
}) => {
  const [localLines, setLocalLines] = useState([])
  const [drawing, setDrawing] = useState(false);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [transformerProps, setTransformerProps] = useState({
    // Initial transformer properties
    x: position.x,
    y: position.y,
    scaleX: 1,
    scaleY: 1,
  });
  const groupRef = useRef();
  const transformerRef = useRef();

  const blockWidth = 300;
  const blockHeight = 300;

  useEffect(() => {
    // Handlers to set the shiftPressed state based on key events
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') {
        setShiftPressed(true);
        setDrawing(false); // Optionally ensure drawing is disabled when Shift is pressed
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Shift') {
        setShiftPressed(false);
        // Do not automatically set drawing to true here to avoid unintended drawing
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    // Function to handle global mouse up, stops drawing
    const handleGlobalMouseUp = () => setDrawing(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  useEffect(() => {
    if (transformerRef.current && drawing) {
      transformerRef.current.setAttrs(transformerProps);
    }
  }, [transformerProps, drawing]);
  

  const handleMouseDown = (e) => {
    if (!shiftPressed) {
      setDrawing(true);
      e.evt.stopPropagation(); // Prevent the event from bubbling up if needed
      const pos = e.target.getStage().getPointerPosition();
      setLocalLines([...localLines, [pos.x - position.x, pos.y - position.y]]);
    }
  };

  const handleMouseMove = (e) => {
    if (drawing) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = localLines[localLines.length - 1];
      lastLine = [...lastLine, point.x - position.x, point.y - position.y];
      setLocalLines([...localLines.slice(0, -1), lastLine]);
    }
  };

  

  // Handler for ending the drawing
  const handleMouseUp = () => {
    setDrawing(false);
    updateLocalLines(localLines);
  };

  return (
    <Group
      ref={groupRef}
      draggable={!drawing} // Only allow dragging if not drawing
      x={position.x}
      y={position.y}
      onDragStart={() => onDragStart(id)}
      onDragEnd={(e) => {
        const newPos = { x: e.target.x(), y: e.target.y() };
        onDragEnd(id, newPos);
      }}
    >
      {/* Background rectangle for drawing */}
      <Rect
        width={blockWidth}
        height={blockHeight}
        fill="gray"
        strokeWidth={1}
        stroke="black"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <Text 
        text={"Visual Block"}
      />
      {/* Drawing lines */}
      {localLines.map((line, i) => (
        <Line
          key={i}
          points={line}
          stroke="black"
          strokeWidth={2}
          lineCap="round"
          lineJoin="round"
        />
      ))}
      {drawing && (
        <Transformer
          {...transformerProps}
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Ensure the transformer doesn't go outside the stage
            if (
              newBox.x < 0 ||
              newBox.y < 0 ||
              newBox.x + newBox.width > width ||
              newBox.y + newBox.height > height
            ) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Group>
  );
};

export default DrawBlock;