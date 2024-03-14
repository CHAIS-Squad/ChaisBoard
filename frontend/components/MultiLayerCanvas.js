import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Text, Rect, Circle, Star, Arrow } from 'react-konva';
import Draggable from 'react-draggable';
import dynamic from 'next/dynamic';
import Sidebar from './Sidebar';
import CodeEditor from './CodeEditor';

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
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectionRect, setSelectionRect] = useState(null); // {x, y, width, height}
  const [selectedObjects, setSelectedObjects] = useState([]); // Array of selected object IDs
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleCodeEditor = () => setShowCodeEditor(!showCodeEditor);
  const toggleSelectionMode = () => setIsSelectionMode(!isSelectionMode);

  const selectElement = (type, id, isDoubleClick) => {
    setSelection({ type, id });

    // Check if a text element is selected and toggle its editing mode only on double-click
    if (type === 'text' && isDoubleClick) {
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

  const handleMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();

    // Check if in selection mode and the click target is the stage
    if (isSelectionMode && e.target === e.target.getStage()) {
      setSelectionRect({ x, y, width: 0, height: 0 }); // Start selection rectangle
      setSelectedObjects([]); // Clear previous selections
      isDrawing.current = false; // Ensure we're not in drawing mode
    } else if (e.target === e.target.getStage()) {
      deselectElement(); // Deselect elements if not in selection mode and clicking on the stage

      // Continue with your line drawing logic
      isDrawing.current = true;
      const newLine = { points: [], color: currentColor };
      setLines((prevLines) => [...prevLines, newLine]);
    } else {
      isDrawing.current = false;
    }
  };

  const handleMouseMove = (e) => {
    if (isDrawing.current) {
      // Your existing line drawing logic
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      setLines((prevLines) => {
        const lastLine = { ...prevLines[prevLines.length - 1] };
        lastLine.points = [...lastLine.points, point.x, point.y];
        return [...prevLines.slice(0, -1), lastLine];
      });
    } else if (isSelectionMode && selectionRect) {
      // Update selection rectangle dimensions
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      const width = point.x - selectionRect.x;
      const height = point.y - selectionRect.y;
      setSelectionRect({ ...selectionRect, width, height });
    }
  };

  const handleMouseUp = () => {
    if (isDrawing.current) {
      // Finalize line drawing
      isDrawing.current = false;
      saveHistory();
    } else if (isSelectionMode && selectionRect) {
      // Identify selected objects and clear selection rectangle
      identifySelectedObjects();
      setSelectionRect(null); // Optionally keep to show selection
    }
  };

  // Function to add a new shape based on the selected type
  const addShape = () => {
    const newShape = {
      id: `${selectedShape}-${shapes.length}`, // Use selectedShape instead of selectedShapeType
      shapeType: selectedShape,
      color: currentColor,
      x: 300,
      y: 100,
      rotation: 0,
      isDragging: false, // Initial dragging state is false
    };
    setShapes((prevShapes) => [...prevShapes, newShape]);
    saveHistory();
  };

  const saveHistory = () => {
    const currentStepHistory = {
      lines: [...lines],
      shapes: [...shapes],
      texts: [...texts],
    };
    const newHistory = history.slice(0, historyStep + 1); // Remove "future" states if any
    newHistory.push(currentStepHistory);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1); // Update the current step
  };

  const handleUndo = useCallback(() => {
    if (historyStep > 0) {
      const previousStep = history[historyStep - 1];
      setLines(previousStep.lines);
      setShapes(previousStep.shapes);
      setTexts(previousStep.texts);
      setHistoryStep(historyStep - 1);
    }
  }, [history, historyStep]); // Dependencies

  const handleRedo = useCallback(() => {
    if (historyStep < history.length - 1) {
      const nextStep = history[historyStep + 1];
      setLines(nextStep.lines);
      setShapes(nextStep.shapes);
      setTexts(nextStep.texts);
      setHistoryStep(historyStep + 1);
    }
  }, [history, historyStep]); // Dependencies

  const width = window.innerWidth;
  const height = window.innerHeight;

  const handleShapeDragStart = (shapeId) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        return { ...shape, isDragging: true };
      }
      return shape;
    });
    setShapes(updatedShapes);
    saveHistory();
  };

  const handleShapeDragEnd = (shapeId, { x, y, scaleX, scaleY }) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        return {
          ...shape,
          x,
          y,
          scaleX: scaleX || 1, // Safely default to 1 if undefined
          scaleY: scaleY || 1, // Safely default to 1 if undefined
          isDragging: false,
        };
      }
      return shape;
    });
    setShapes(updatedShapes);
    saveHistory();
  };

  const handleTextDragStart = (e) => {
    // Safely attempt to get 'id' from the Konva node
    const draggedTextId = e.target?.attrs?.id || e.target?.id();

    if (!draggedTextId) {
        console.error("Failed to identify dragged text id");
        return;
    }

    // Record the start position
    const startPos = { x: e.target.x(), y: e.target.y() };
    // Assuming you're setting startPos for later, ensure e.target is a Konva Node
    if(e.target.nodeType === 'Shape') {
        e.target.setAttr('startPos', startPos);
    }

    const updatedTexts = texts.map((text) => {
        if (selectedObjects.find(obj => obj.id === text.id)) {
            return { ...text, isDragging: true };
        }
        return text;
    });
    setTexts(updatedTexts);
};

  

const handleTextDragEnd = (e) => {
  // Safely attempt to get 'id' and 'startPos'
  const draggedTextId = e.target?.attrs?.id || e.target?.id();
  const startPos = e.target?.getAttr('startPos');

  if (!startPos || !draggedTextId) {
      console.error("Failed to get drag start position or text id");
      return;
  }

  const deltaX = e.target.x() - startPos.x;
  const deltaY = e.target.y() - startPos.y;

  const updatedTexts = texts.map((text) => {
      if (selectedObjects.find(obj => obj.id === text.id)) {
          return {
              ...text,
              position: { x: text.position.x + deltaX, y: text.position.y + deltaY },
              isDragging: false,
          };
      }
      return text;
  });
  setTexts(updatedTexts);
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
          isEditing: false, // Ensure we exit editing mode
        };
      }
      return text;
    });

    setTexts(updatedTexts);
    saveHistory();
  };
  

  const addText = () => {
    const newTextId = `text-${texts.length}`;
    const newText = {
      id: `text-${texts.length}`,
      position: { x: 300, y: texts.length * 20 + 100 },
      text: 'Hello World',
      color: currentColor,
      isDragging: false,
      isEditing: false,
    };
    setTexts((prevTexts) => [...prevTexts, newText]);
    saveHistory();
  };

  const clearCanvas = () => {
    setLines([]);
    setShapes([]);
    setTexts([]);
    // Reset any other states related to the canvas content
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
      shapeID += 1;
    }
    for (const templateText of templateObjects.texts) {
      const newText = {
        ...templateText,
        id: `text-${texts.length}`,
      };
      setTexts((prevTexts) => [...prevTexts, newText]);
    }
    for (const templateLine of templateObjects.lines) {
      const newLine = {
        ...templateLine,
        id: `line-${lines.length}`,
      };
      setLines((prevLines) => [...prevLines, newLine]);
    }
    saveHistory();
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle delete functionality
      if ((e.key === 'Delete' || e.key === 'Backspace') && selection.id) {
        const selectedText = texts.find((text) => text.id === selection.id);
        if (selectedText && selectedText.isEditing) {
          // If in editing mode, don't proceed with deletion
          return;
        }

        e.preventDefault();
        // Check if the selection is a text and remove it accordingly
        if (selection.type === 'text') {
          setTexts((currentTexts) =>
            currentTexts.filter((text) => text.id !== selection.id)
          );
        } else {
          // Assuming other shapes are handled similarly
          setShapes((currentShapes) =>
            currentShapes.filter((shape) => shape.id !== selection.id)
          );
        }
        // Clear selection after deletion
        setSelection({ type: null, id: null });
      }
      // Handle undo functionality
      else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
      // Handle redo functionality
      else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') {
        // Capital 'Z' for shift combination
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selection,
    setShapes,
    setSelection,
    handleUndo,
    handleRedo,
    lines,
    shapes,
  ]);

  const identifySelectedObjects = () => {
    const rect = {
      x1: Math.min(selectionRect.x, selectionRect.x + selectionRect.width),
      y1: Math.min(selectionRect.y, selectionRect.y + selectionRect.height),
      x2: Math.max(selectionRect.x, selectionRect.x + selectionRect.width),
      y2: Math.max(selectionRect.y, selectionRect.y + selectionRect.height),
    };

    if (selectionRect.width < 0) {
      rect.x1 = selectionRect.x + selectionRect.width;
    }
    if (selectionRect.height < 0) {
      rect.y1 = selectionRect.y + selectionRect.height;
    }

    const selected = [];

    // Handle shapes selection
    shapes.forEach((shape) => {
      if (isWithinSelectionRect(shape, rect)) {
        selected.push({ type: 'shape', id: shape.id });
      }
    });

    // Handle texts
    texts.forEach((text) => {
      // If text.width and text.height are not directly available, estimate or calculate these values.
      // Example: Use a default width and height if not set
      const textWidth = text.width || 100; // Default width if not set
      const textHeight = text.height || 20; // Default height if not set

      const textRect = {
        x1: text.position.x,
        y1: text.position.y,
        x2: text.position.x + textWidth,
        y2: text.position.y + textHeight,
      };

      // Debugging output to help troubleshoot selection issues
      console.log(`Evaluating text: ${text.id}`);
      console.log(
        `Text position and size: x=${text.position.x}, y=${text.position.y}, width=${textWidth}, height=${textHeight}`
      );
      console.log(
        `Selection rect: x1=${rect.x1}, y1=${rect.y1}, x2=${rect.x2}, y2=${rect.y2}`
      );

      // Determine if the text object is within the selection rectangle
      const isWithinSelection =
        rect.x1 < textRect.x2 &&
        rect.x2 > textRect.x1 &&
        rect.y1 < textRect.y2 &&
        rect.y2 > textRect.y1;
      console.log(`Is within rect: ${isWithinSelection}`);

      if (isWithinSelection) {
        selected.push({ type: 'text', id: text.id });
      }
    });

    setSelectedObjects(selected);
  };

  const isWithinSelectionRect = (object, rect) => {
    // Adjust calculation based on object type if necessary
    const objRight = object.x + (object.width || 100);
    const objBottom = object.y + (object.height || 20);

    return (
      object.x >= rect.x1 &&
      object.y >= rect.y1 &&
      objRight <= rect.x2 &&
      objBottom <= rect.y2
    );
  };

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
        clearCanvas={clearCanvas}
        onToggleCodeEditor={toggleCodeEditor}
        showCodeEditor={showCodeEditor}
        isSelectionMode={isSelectionMode}
        onToggleSelectionMode={toggleSelectionMode}
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
        <Layer>
          {selectionRect && (
            <Rect
              x={selectionRect.x}
              y={selectionRect.y}
              width={selectionRect.width}
              height={selectionRect.height}
              stroke='#0A74DA' // Example stroke color
              strokeWidth={1}
              dash={[4, 4]} // Optional: dashed line style
            />
          )}
        </Layer>
        <Whiteboard lines={lines} />
        <DraggableShapes
          shapes={shapes}
          onDragStart={handleShapeDragStart}
          onDragEnd={handleShapeDragEnd}
          selection={selection}
          setSelection={setSelection}
          selectedObjects={selectedObjects || []}
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
              // onDoubleClick={() => selectElement('text', text.id)}
              onUpdate={(id, newText) => handleTextUpdate(id, newText)}
              isSelected={selectedObjects.some(obj => obj.id === text.id && obj.type === 'text')}
              onSelect={selectElement}
              saveHistory={saveHistory}
              
            />
          </Layer>
        ))}
      </Stage>
      {showCodeEditor && (
        <Draggable defaultPosition={{ x: 200, y: -300 }}>
          <div style={{ position: 'absolute', zIndex: 1000 }}>
            <CodeEditor />
          </div>
        </Draggable>
      )}
    </>
  );
}
