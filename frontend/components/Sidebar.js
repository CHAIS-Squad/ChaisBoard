import { useEffect, useState } from 'react';
import useCanvasTemplates from '@/api/canvas-templates';
import ColorPickerModal from './ColorPickerModal';

const Sidebar = ({ selectedShape, setSelectedShape, addShape, handleUndo, handleRedo, addText, importTemplate, currentColor, setCurrentColor }) => {

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
      <TemplatesToolbar importTemplate={importTemplate} />
      <button onClick={addText}>Add Text</button>
      <ColorPickerModal currentColor={currentColor} setCurrentColor={setCurrentColor} />
    </div>
  );
};

function TemplatesToolbar({ importTemplate }) {
  const { getCanvasTemplate, getCanvasTemplatesList } = useCanvasTemplates();
  const [ templates, setTemplates ] = useState([]);
  const [ selectedTemplate, setSelectedTemplate ] = useState({});

  useEffect(() => {
    updateTemplateSelector();
  }, []);

  async function updateTemplateSelector() {
    const response = await getCanvasTemplatesList();
    setTemplates(response);
  }

  async function retrieveTemplate(event) {
    const templateId = event.target.value;
    const response = await getCanvasTemplate(templateId);
    setSelectedTemplate(response);
  }

  function handleTemplateSubmit(event) {
    event.preventDefault();
    importTemplate(selectedTemplate.konva_objects);
  }

  return (
    <form onSubmit={handleTemplateSubmit} className='flex flex-col'>
        <label htmlFor="templateSelector">Import a template:</label>
        <select name="templateSelector" id="templateSelector" onChange={retrieveTemplate}>
          {templates && templates.map((template) => {
            return (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            );
          })}
        </select>
        <button type='submit' disabled={!selectedTemplate.id}>Add Template</button>
      </form>
  );
}

export default Sidebar;
