import React from 'react';
// Example SVG paths for each icon, replace with your actual SVG paths or components
const icons = {
  Star: <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.515 7.124 7.485.686-5.5 5.362 1.297 7.641-6.797-3.673-6.797 3.673 1.297-7.641-5.5-5.362 7.485-.686z"/></svg>,
  Circle: <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>,
  Rect: <svg width="24" height="24" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16"/></svg>,
  Hexagon: <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2l10 6v12l-10 6-10-6V8z"/></svg>,
  case 'RightArrow':
  icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
      <path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z"/>
    </svg>
  );
  break;
case 'LeftArrow':
  icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
      <path d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z"/>
    </svg>
  );
  break;

};
const Sidebar = ({ selectedShape, setSelectedShape, addShape, handleUndo, handleRedo }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100%', padding: '20px', background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', zIndex: 1000 }}>
      {/* Use a div container for the shape icons */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: '10px' }}>
        {Object.entries(icons).map(([shapeType, icon]) => (
          <div
            key={shapeType}
            onClick={() => setSelectedShape(shapeType)}
            style={{
              cursor: 'pointer',
              border: selectedShape === shapeType ? '2px solid #000' : 'none',
              padding: '10px',
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