import { useEffect, useState } from 'react';
import useCanvasTemplates from '@/api/canvas-templates';

function Sidebar({ selectedShape, setSelectedShape, addShape, handleUndo, handleRedo, onSave, onAdd, addTemplate}) {
  const { getCanvasTemplate, getCanvasTemplatesList } = useCanvasTemplates();
  const [ templates, setTemplates ] = useState([]);

  useEffect(() => {
    const response = getCanvasTemplatesList();
    setTemplates(response);
  }, []);

  function handleTemplateSubmit(event) {
    event.preventDefault();
    const templateObjects = getCanvasTemplate(event.target.templateSelector.value);
    addTemplate(templateObjects);
  }

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
      <button onClick={onSave}>Save</button>
      <button onClick={onAdd}>Load</button>
      
      <form onSubmit={handleTemplateSubmit} className='flex flex-col'>
        <label htmlFor="templateSelector">Import a template:</label>
        <select name="templateSelector" id="templateSelector">
          {/* {templates.map((template) => {
            return <option key={template.id} value={template.id}>{template.name}</option>
          })} */}
        </select>
        <button type='submit'>Add Template</button>
      </form>
    </div>
  );
};

export default Sidebar;
