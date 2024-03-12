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

import React, { useState, useRef } from 'react';
import { Layer, Group } from 'react-konva';

const DrawBlock = ({ id, position, lines, shapes, onCreate, onDragStart, onDragEnd }) => {
  const [localLines, setLocalLines] = useState(lines || []);

  const handleLineDraw = (newLines) => {
    setLocalLines([...localLines, ...newLines]); 
  };

  const handleClick = () => {
    if (onCreate) {
      onCreate(); 
    }
  };


  return (
    <Layer draggable onDragStart={() => onDragStart(id)} onDragEnd={onDragEnd}>
      <Group x={position.x} y={position.y}>
        <Whiteboard lines={localLines} onLineDraw={handleLineDraw} />
      </Group>
      <button onClick={handleClick}>Create New Block</button> 
    </Layer>
  );
};

export default DrawBlock;


// You can't put a <Stage> within another <Stage>
// Solution was to try and make it so that you draw within a specific layer with a shape (rect) and all of the lines.
// Lines should move alongside the shape with either layer or grouping
// Lines 173-206 in MultiLayerCanvas.js are some functions used to create a new drawblock.
// Note: Groups can't have Layer's as children.