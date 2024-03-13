import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Text, Rect, Circle, Star } from 'react-konva';
import dynamic from 'next/dynamic';
import Sidebar from './Sidebar';

const Whiteboard = dynamic(() => import('../components/Whiteboard'), {
  ssr: false,
});
const DraggableShapes = dynamic(() => import('../components/DraggableShapes'), {
  ssr: false,
});
const DraggableText = dynamic(() => import('../components/DraggableText'), {
  ssr: false,
});
const DrawBlock = dynamic(() => import('../components/DrawBlock'), {
  ssr: false,
});

export default function MultiLayerCanvas() {
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectedShape, setSelectedShape] = useState('Rect');
  const isDrawing = useRef(false);
  const [history, setHistory] = useState([...shapes]);
  const [historyStep, setHistoryStep] = useState(0);
  const [texts, setTexts] = useState([
    {
      id: 'text1',
      position: { x: 210, y: 50 },
      text: 'Drag me!',
      isDragging: false,
    },
  ]);


  // console.log('Current texts state:', texts);
  // console.log('Current selectedShape state:', selectedShape);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lines, shapes]);

  const handleMouseDown = (e) => {
    // Check if the event target is the Stage to only start drawing if clicking on empty space
    if (e.target === e.target.getStage()) {
      isDrawing.current = true;
      setLines((prevLines) => [...prevLines, []]);
      saveHistory();
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
      x: Math.max(210, Math.random() * window.innerWidth * 0.8),
      y: Math.random() * window.innerHeight * 0.8,
      rotation: Math.random() * 180,
      isDragging: false, // Initial dragging state is false
    };
    setShapes((prevShapes) => [...prevShapes, newShape]);
    saveHistory();
  };

  const saveHistory = () => {
    const newHistory = history.slice(0, historyStep + 1);
    setHistory([...newHistory, { lines, shapes }]);
    setHistoryStep(historyStep + 1);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setShapes(history[historyStep - 1].shapes);
      setLines(history[historyStep - 1].lines);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      setShapes(history[historyStep + 1].shapes);
      setLines(history[historyStep + 1].lines);
    }
  };

  const width = window.innerWidth;
  const height = window.innerHeight;

  const handleDragStart = (shapeId) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        return { ...shape, isDragging: true };
      }
      return shape;
    });
    setShapes(updatedShapes);
    saveHistory();
  };

  const handleDragEnd = (shapeId, newPos) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        return { ...shape, ...newPos, isDragging: false };
      }
      return shape;
    });
    setShapes(updatedShapes);
    saveHistory();
  };

  const handleTextDragStart = (textId) => {
    const updatedTexts = texts.map((text) => {
      if (text.id === textId) {
        return { ...text, isDragging: true };
      }
      return text;
    });
    setTexts(updatedTexts);
  };

  const handleTextDragEnd = (textId, e) => {
    if (
      e.target &&
      typeof e.target.x === 'function' &&
      typeof e.target.y === 'function'
    ) {
      const updatedTexts = texts.map((text) => {
        if (text.id === textId) {
          return {
            ...text,
            position: { x: e.target.x(), y: e.target.y() },
            isDragging: false,
          };
        }
        return text;
      });
      setTexts(updatedTexts);
    } else {
      console.error('Unexpected event target:', e.target);
    }
  };

  const handleCreateBlock = () => {
    const newBlock = {
      id: `block-${blocks.length + 1}`,
      position: { x: 500, y: 500 },
      lines: [],
    };
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    saveHistory();
  };
  
  const handleBlockDragEnd = (id, newPos) => {
    const updatedBlocks = blocks.map(block => {
      if (block.id === id) {
        return { ...block, position: newPos };
      }
      return block;
    });
    setBlocks(updatedBlocks);
    saveHistory();
  };

  return (
    <>
      <Sidebar
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        addShape={addShape}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        handleCreateBlock={handleCreateBlock}
      />

      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove} // Corrected casing
        onMouseUp={handleMouseUp} // Corrected casing
        onDrag={(e) => e.preventDefault()}
      >
        <Layer>
          <Text text='Static test' x={10} y={10} />

        </Layer>
        <Layer>
          <Whiteboard lines={lines} />
        </Layer>
        {blocks.map((block) => (
          <Layer key={block.id}>
            <DrawBlock
              id={block.id}
              position={block.position}
              lines={block.lines}
              onCreate={handleCreateBlock} 
              onDragStart={handleDragStart} 
              onDragEnd={handleBlockDragEnd}
            />
          </Layer>
        ))}
        <DraggableShapes
          shapes={shapes}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />

        {texts.map((text) => (
          <DraggableText
            key={text.id}
            text={text.text}
            position={text.position}
            isDragging={text.isDragging}
            onDragStart={() => handleTextDragStart(text.id)}
            onDragEnd={(e) => handleTextDragEnd(text.id, e)}
          />
        ))}
      </Stage>
    </>
  );
}
