import React from 'react';

const Sidebar = ({ selectedShape, setSelectedShape, addShape, handleUndo, handleRedo, drawClick, drawDrag }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100%', padding: '20px', background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', zIndex: 1000 }}>
      <select onChange={(e) => setSelectedShape(e.target.value)} value={selectedShape} style={{ marginBottom: '10px' }}>
        <option value='Star'>Star</option>
        <option value='Circle'>Circle</option>
        <option value='Rect'>Rectangle</option>
      </select>
      
      <button onClick={addShape} style={{ marginBottom: '10px' }}>Add Shape</button>
      <button onClick={handleUndo} style={{ marginBottom: '10px' }}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <button
        onClick={drawClick} 
        draggable  
        onDragStart={drawDrag} 
        style={{ marginBottom: '10px', cursor: 'grab' }}
      >
        Add Visual Block
      </button>
    </div>
  );
};

export default Sidebar;