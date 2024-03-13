// import React, { useState, useRef  } from 'react';
// import { Stage, Layer, Text, Rect, Group, Line } from 'react-konva';
// import Whiteboard from './Whiteboard';

// export default function CanvasBlock() {
//   const [lines, setLines] = useState([]);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const stageRef = useRef();
//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const cardWidth = 300;
//   const cardHeight = 200;

//   const handleDragMove = (e) => {
//     setPosition({
//       x: e.target.x(),
//       y: e.target.y(),
//     });
//   };

//   const handleMouseDown = () => {
//     setLines((prevLines) => [...prevLines, []]);
//   };

//   const handleMouseMove = (e) => {
//     const point = e.target.getStage().getPointerPosition();
//     let lastLine = lines[lines.length - 1];
//     if (lastLine) {
//       lastLine = [...lastLine, point.x, point.y];
//       setLines(lines.slice(0, -1).concat([lastLine]));
//     }
//   };

//   return (
//     <>

//       {/* <Layer>
//         <Group x={position.x} y={position.y} onDragMove={handleDragMove}>
//           <Rect width={cardWidth} height={cardHeight} fill="#f0f0f0" cornerRadius={10} />
//         </Group>
//       </Layer>
//       <Layer>
//         {lines.map((line, index) => (
//           <Line
//             key={index}
//             points={line}
//             stroke="black"
//             strokeWidth={5}
//             lineCap="round"
//             lineJoin="round"
//           />
//         ))}
//       </Layer>
//       <Layer>
//         <Rect
//           width={cardWidth}
//           height={cardHeight}
//           fill="transparent"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//         />
//       </Layer> */}
//     </>
//   );
// };

import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Group, Line, Text } from 'react-konva';
import Whiteboard from './Whiteboard';

const DrawBlock = ({
  id,
  position,
  lines,
  shapes,
  onCreate,
  onDragStart,
  onDragEnd,
}) => {
  const [localLines, setLocalLines] = useState(lines || []);
  const [drawing, setDrawing] = useState(false);
  const groupRef = useRef();

  const blockWidth = 300;
  const blockHeight = 300;

  useEffect(() => {
    // Function to stop drawing
    const stopDrawing = () => {
      if (drawing) {
        setDrawing(false);
      }
    };

    // Attach event listener to the window for mouse up events
    window.addEventListener('mouseup', stopDrawing);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('mouseup', stopDrawing);
    };
  }, [drawing]); // Depend on the drawing state to add or remove the listener as needed

  const handleMouseDown = (e) => {
    const clickedOnRect = e.target.className === 'Rect';
    if (clickedOnRect) {
      setDrawing(true);
      e.evt.stopPropagation(); // Prevent the event from bubbling up
      const pos = e.target.getStage().getPointerPosition();
      setLocalLines([...localLines, [pos.x - position.x, pos.y - position.y]]);
    }
  };

  // Add points to the current line on mouse move
  const handleMouseMove = (e) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = localLines[localLines.length - 1];
    lastLine = [...lastLine, point.x - position.x, point.y - position.y];
    setLocalLines([...localLines.slice(0, -1), lastLine]);
  };

  // Handler for ending the drawing
  const handleMouseUp = () => {
    setDrawing(false);
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
    </Group>
  );
};

export default DrawBlock;

// You can't put a <Stage> within another <Stage>
// Solution was to try and make it so that you draw within a specific layer with a shape (rect) and all of the lines.
// Lines should move alongside the shape with either layer or grouping
// Lines 173-206 in MultiLayerCanvas.js are some functions used to create a new drawblock.
// Note: Groups can't have Layer's as children.
