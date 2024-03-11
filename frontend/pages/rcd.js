import { useRef, useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import styles from '../styles/rcd.module.css';

const RcdPage = () => {
  const canvasRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [draggedTemplate, setDraggedTemplate] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl (or Cmd) + Z is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        handleUndo();
      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleUndo = () => {
    canvasRef.current.undo();
  };

  const handleClearCanvas = () => {
    canvasRef.current.clear();
  };

  const handleTemplateDragStart = (event, template) => {
    setDraggedTemplate(template);
  };

  const handleTemplateDragEnd = () => {
    setDraggedTemplate(null);
  };

  const handleCanvasDrop = (event) => {
    event.preventDefault();

    if (draggedTemplate) {
      const { clientX, clientY } = event;

      // Default width and height for the templates
      const defaultWidth = 100;
      const defaultHeight = 50;

      // Snap to grid (adjust these values as needed)
      const snapX = Math.round(clientX / 20) * 20;
      const snapY = Math.round(clientY / 20) * 20;

      // Add the template to the canvas with default width and height
      setTemplates((prevTemplates) => [
        ...prevTemplates,
        {
          type: draggedTemplate,
          x: snapX,
          y: snapY,
          width: defaultWidth,
          height: defaultHeight,
        },
      ]);

      // Reset the dragged template
      setDraggedTemplate(null);
    }
  };

  const renderTemplates = () => {
    return templates.map((template, index) => {
      if (template.type === 'textCard') {
        return (
          <div
            key={index}
            className={styles.textCard}
            style={{ left: `${template.x}px`, top: `${template.y}px` }}
          >
            Text Card
          </div>
        );
      }
      // Add more template types as needed

      return null;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <button onClick={handleUndo}>Undo (Ctrl+Z)</button>
        <button onClick={handleClearCanvas}>Clear Canvas</button>
        <div
          draggable
          onDragStart={(e) => handleTemplateDragStart(e, 'textCard')}
          onDragEnd={handleTemplateDragEnd}
        >
          Text Card Template
        </div>

      </div>
      <div
        className={styles.canvasContainer}
        onDrop={handleCanvasDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {typeof window !== 'undefined' && (
          <>
            <CanvasDraw
              ref={canvasRef}
              className={styles.canvas}
              brushColor="#000"
              brushRadius={5}
              canvasWidth={100}
              canvasHeight={100}
              enablePanAndZoom
            />
            {renderTemplates()}
          </>
        )}
      </div>
    </div>
  );
};

export default RcdPage;
