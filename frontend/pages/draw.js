import React, { useState } from 'react';
import { Paint } from 'react-paint';

const DrawPage = () => {
  const [color, setColor] = useState('#000000'); // State for selected color
  const [brushSize, setBrushSize] = useState(5); // State for brush size

  // Handler for color change
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  // Handler for brush size change
  const handleBrushSizeChange = (event) => {
    setBrushSize(parseInt(event.target.value));
  };

  return (
    <div>
      <h1>Drawing Page</h1>
      {/* Color selection input */}
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        data-testid="color-picker" // For testing purposes
      />
      {/* Brush size input */}
      <input
        type="number"
        value={brushSize}
        min={1}
        max={20}
        onChange={handleBrushSizeChange}
        data-testid="brush-size-input" // For testing purposes
      />
      {/* Paint component with color and brushSize props */}
      <Paint color={color} brushSize={brushSize} />
    </div>
  );
};

export default DrawPage;
