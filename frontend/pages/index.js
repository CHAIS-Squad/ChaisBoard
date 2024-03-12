import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const Home = () => {
  const [lineColor, setLineColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(30);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas('c', {
      isDrawingMode: true,
    });
    canvas.backgroundColor = "white";
    canvas.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Store the canvas instance in the ref
    canvasRef.current = canvas;

    // Update the canvas on resize
    const resizeListener = () => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.freeDrawingBrush.color = lineColor;
      canvasRef.current.freeDrawingBrush.width = lineWidth;
    }
  }, [lineColor, lineWidth]);

  const addText = () => {
    const text = new fabric.IText('Edit Me', {
      left: 100, // Starting position on the canvas
      top: 100, // Starting position on the canvas
      fontFamily: 'Arial',
      fill: lineColor, // Use the current selected line color for text
      fontSize: 20,
    });

    // Check if the canvas instance exists before adding the text
    if (canvasRef.current) {
      canvasRef.current.add(text);
      canvasRef.current.setActiveObject(text); // Optional: set the text object as the active object
    }
  };

  return (
    <>
      <h1>Fabric.js Drawing Demo</h1>
      <button onClick={() => canvasRef.current.isDrawingMode = !canvasRef.current.isDrawingMode}>
        Toggle Drawing Mode
      </button>
      <button onClick={() => canvasRef.current && canvasRef.current.clear()}>Clear</button>
      <button onClick={addText}>Add Text</button>
      <div>
        Line width: <input type="range" min="1" max="50" value={lineWidth} onChange={(e) => setLineWidth(parseInt(e.target.value, 10))} />
      </div>
      <div>
        Line color: <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} />
      </div>
      <canvas id="c" style={{ width: '100%', height: '100%', position: 'absolute' }} />

      
    </>
  );
};

export default Home;




