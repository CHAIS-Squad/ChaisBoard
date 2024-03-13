import { useEffect, useState } from 'react';
import useCanvasTemplates from '@/api/canvas-templates';
import ColorPickerModal from './ColorPickerModal';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

const Sidebar = ({ selectedShape, setSelectedShape, addShape, handleUndo, handleRedo, addText, importTemplate, currentColor, setCurrentColor }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100%', padding: '20px', background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', zIndex: 1000 }}>
       <DropdownButton id="shape-selector" title="Select Shape" onSelect={setSelectedShape} className="mb-2">
        <Dropdown.Item eventKey='Star'>Star</Dropdown.Item>
        <Dropdown.Item eventKey='Circle'>Circle</Dropdown.Item>
        <Dropdown.Item eventKey='Rect'>Rectangle</Dropdown.Item>
      </DropdownButton>
      <Button onClick={addShape} style={{ marginBottom: '10px' }}>Add Shape</Button>
      <Button onClick={handleUndo} style={{ marginBottom: '10px' }}>Undo</Button>
      <Button onClick={handleRedo}>Redo</Button>
      <TemplatesToolbar importTemplate={importTemplate} />
      <Button onClick={addText}>Add Text</Button>
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
