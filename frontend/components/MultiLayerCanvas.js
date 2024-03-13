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
  const [currentColor, setCurrentColor] = useState('#000000');
  const [selection, setSelection] = useState({ type: null, id: null });

  const selectElement = (type, id) => {
    setSelection({ type, id });

    // Check if a text element is selected and toggle its editing mode
    if (type === 'text') {
      const updatedTexts = texts.map((text) => {
        if (text.id === id) {
          return { ...text, isEditing: true }; // Enable editing mode for the selected text
        }
        return { ...text, isEditing: false }; // Ensure other texts are not in editing mode
      });
      setTexts(updatedTexts);
    }
  };

  const deselectElement = () => {
    // Deselect all elements
    setSelection({ type: null, id: null });

    // Exit editing mode for all texts
    const updatedTexts = texts.map((text) => ({ ...text, isEditing: false }));
    setTexts(updatedTexts);
  };

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
    if (e.target === e.target.getStage()) {
      isDrawing.current = true;
      // Start a new line with the current color
      const newLine = { points: [], color: currentColor };
      setLines((prevLines) => [...prevLines, newLine]);
      saveHistory();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines((prevLines) => {
      const lastLine = { ...prevLines[prevLines.length - 1] };
      lastLine.points = [...lastLine.points, point.x, point.y]; // Add new points to the current line

      return [...prevLines.slice(0, -1), lastLine]; // Update the lines array with the modified last line
    });
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

  const handleTextUpdate = (textId, updateProps) => {
    const updatedTexts = texts.map((text) => {
      if (text.id === textId) {
        // Spread existing text properties, then override with any updates
        return {
          ...text,
          ...updateProps, // Apply updates, which may include text, fontSize, and/or position
          position: { ...text.position, ...updateProps.position }, // Ensure position updates are merged
          isEditing: false // Ensure we exit editing mode
        };
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
      color: currentColor,
      isDragging: false,
      isEditing: false,
    };
    setTexts((prevTexts) => [...prevTexts, newText]);
    saveHistory();
  };
  
  // import canvas template
  function importTemplate(templateObjects) {
    let shapeID = shapes.length;
    for (const templateShape of templateObjects.shapes) {
      const newShape = {
        ...templateShape,
        id: `${templateShape.shapeType}-${shapeID}`,
      };
      setShapes((prevShapes) => [...prevShapes, newShape]);
      saveHistory();
      shapeID += 1;
    }
    for (const templateText of templateObjects.texts) {
      const newText = {
        ...templateText,
        id: `text-${texts.length}`,
      };
      setTexts((prevTexts) => [...prevTexts, newText]);
      saveHistory();
    }
    // for (const templateLine of templateObjects.lines) {
    //   const newLine = {
    //     ...templateLine,
    //     id: `line-${lines.length}`,
    //   };
    //   setLines((prevLines) => [...prevLines, newLine]);
    //   saveHistory();
    // }
  }

  // export canvas template
  function exportTemplate() {
    const templateObjects = {
      shapes: shapes,
      texts: texts,
      lines: lines,
    };
    return templateObjects;
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
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />

      <Stage
        width={width}
        height={height}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            deselectElement();
          }
          handleMouseDown(e);
        }}
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
              color={text.color}
              fontSize={text.fontSize}
              editing={
                text.isEditing &&
                selection.type === 'text' &&
                selection.id === text.id
              }
              onDragStart={() => handleTextDragStart(text.id)}
              onDragEnd={(e) => handleTextDragEnd(text.id, e)}
              onDoubleClick={() => selectElement('text', text.id)}
              onUpdate={(id, newText) => handleTextUpdate(id, newText)}
              isSelected={selection.type === 'text' && selection.id === text.id}
            />
          </Layer>
        ))}
      </Stage>
    </>
  );
}
