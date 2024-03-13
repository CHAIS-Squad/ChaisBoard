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
const TextEditor = dynamic(() => import('../components/TextEditor'), {
  ssr: false,
});

export default function MultiLayerCanvas() {
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState('Rect');
  const isDrawing = useRef(false);
  const [history, setHistory] = useState([...shapes]);
  const [historyStep, setHistoryStep] = useState(0);
  const [texts, setTexts] = useState([]);

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
    // Ensure e.target is defined and has .x() and .y() methods
    if (
      e.target &&
      typeof e.target.x === 'function' &&
      typeof e.target.y === 'function'
    ) {
      const updatedTexts = texts.map((text) => {
        if (text.id === textId) {
          // Use e.target.x() and e.target.y() to get the new position
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

  const handleTextDoubleClick = (textId) => {
    const updatedTexts = texts.map((text) => {
      if (text.id === textId) {
        return { ...text, isEditing: true };
      }
      return text;
    });
    setTexts(updatedTexts);
  };

  const handleTextUpdate = (textId, newText) => {
    const updatedTexts = texts.map((text) => {
      if (text.id === textId) {
        return { ...text, text: newText, isEditing: false };
      }
      return text;
    });
    setTexts(updatedTexts);
    saveHistory();
  };

  const addText = () => {
    const newText = {
      id: `text-${texts.length}`, // Ensuring each text has a unique ID
      position: { x: 200, y: texts.length * 20 + 100 },
      text: 'New Text',
      isDragging: false,
      isEditing: false,
    };
    setTexts((prevTexts) => [...prevTexts, newText]);
    saveHistory();
  };
  
  // import canvas template
  function importTemplate(templateObjects) {
    for (const templateShape of templateObjects.shapes) {
      templateShape.id += `-${shapes.length}`;
      setShapes((prevShapes) => [...prevShapes, templateShape]);
      saveHistory();
    }
  }

  // export canvas template
  function exportTemplate() {
    const templateObjects = {
      shapes: shapes,
    };
    return templateObjects
  }

  return (
    <>
      <Sidebar
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        addShape={addShape}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        addText={addText}
        importTemplate={importTemplate}
        exportTemplate={exportTemplate}
      />

      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Whiteboard lines={lines} />
        <DraggableShapes
          shapes={shapes}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
        {texts.map((text) => (
          <Layer key={text.id}>
            <TextEditor
              id={text.id}
              text={text.text}
              position={text.position}
              isDragging={text.isDragging}
              editing={text.isEditing}
              onDragStart={() => handleTextDragStart(text.id)}
              onDragEnd={(e) => handleTextDragEnd(text.id, e)}
              onDoubleClick={() => handleTextDoubleClick(text.id)}
              onUpdate={(id, newText) => handleTextUpdate(id, newText)}
            />
          </Layer>
        ))}
      </Stage>
    </>
  );
}
