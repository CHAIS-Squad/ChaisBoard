import React from 'react';

// Updated SVG paths for each icon, including RightArrow and LeftArrow
const icons = {
  Star: <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.515 7.124 7.485.686-5.5 5.362 1.297 7.641-6.797-3.673-6.797 3.673 1.297-7.641-5.5-5.362 7.485-.686z"/></svg>,
  Circle: <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>,
  Rect: <svg width="24" height="24" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16"/></svg>,
  Hexagon: <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2l10 6v12l-10 6-10-6V8z"/></svg>,
  RightArrow: <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 4l8 8-8 8V4z"/></svg>,
  LeftArrow: <svg width="24" height="24" viewBox="0 0 24 24"><path d="M16 4l-8 8 8 8V4z"/></svg>,
};

const Sidebar = ({ selectedShape, setSelectedShape, addShape, handleUndo, handleRedo }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100%', padding: '20px', background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', zIndex: 1000 }}>
      {/* Updated this div to use flexDirection: 'column' for vertical alignment */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '10px' }}>
        {Object.entries(icons).map(([shapeType, icon]) => (
          <div
            key={shapeType}
            onClick={() => setSelectedShape(shapeType)}
            style={{
              cursor: 'pointer',
              border: selectedShape === shapeType ? '2px solid #000' : 'none',
              padding: '10px',
              // Optionally, align icons to the center or start within their container
              display: 'flex',
              justifyContent: 'center', // Center horizontally in the div
            }}
          >
            {icon}
          </div>
        ))}
      </div>
      <button onClick={addShape} style={{ marginBottom: '10px' }}>Add Shape</button>
      <button onClick={handleUndo} style={{ marginBottom: '10px' }}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
    </div>
  );
};

export default Sidebar;

