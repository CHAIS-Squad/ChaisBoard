import { useEffect, useState } from 'react';
import useCanvasTemplates from '@/api/canvas-templates';

const Sidebar = ({ selectedShape, setSelectedShape, addShape, handleUndo, handleRedo, addText, importTemplate, exportTemplate }) => {

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
      <button onClick={addText}>Add Text</button>
      <TemplatesToolbar importTemplate={importTemplate} exportTemplate={exportTemplate} />
    </div>
  );
};

function TemplatesToolbar({ importTemplate, exportTemplate }) {
  const { getCanvasTemplate, getCanvasTemplatesList, createCanvasTemplate } = useCanvasTemplates();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});

  useEffect(() => {
    updateTemplateSelector();
  }, [selectedTemplate]);

  async function updateTemplateSelector() {
    const response = await getCanvasTemplatesList();
    setTemplates(response);
  }

  async function retrieveTemplate(event) {
    const templateId = event.target.value;
    if (templateId === 'create' || templateId === 'select') {
      setSelectedTemplate(templateId);
    } else {
      const response = await getCanvasTemplate(templateId);
    setSelectedTemplate(response);
    }
  }

  function handleAddTemplate() {
    importTemplate(selectedTemplate.konva_objects);
  }

  async function handleCreateTemplate(event) {
    event.preventDefault();
    const newTemplateName = event.target.newTemplateName.value;
    const templateNames = templates.map((template) => template.name);
    if (newTemplateName === '' || templateNames.includes(newTemplateName)) {
      alert('Template name not available. Please choose a different name.');
    } else {
      const templateObjects = exportTemplate();
      const newCanvasTemplate = {
        name: newTemplateName,
        description: 'to do',
        konva_objects: templateObjects,
      }
      const response = await createCanvasTemplate(newCanvasTemplate);
      setSelectedTemplate(response);
    }
    event.target.reset();
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <label htmlFor="templateSelector">Import a template:</label>
        <select
          name="templateSelector"
          id="templateSelector"
          onChange={retrieveTemplate}
          defaultValue={"select"}
        >
          <option value="select">Select a Template</option>
          <option value="create">Create New</option>
          {templates &&
            templates.map((template) => {
              return (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              );
            })}
        </select>
        <button onClick={handleAddTemplate} disabled={!selectedTemplate.id}>
          Add Template
        </button>
      </div>

      <form onSubmit={handleCreateTemplate} className={`flex flex-col ${selectedTemplate === 'create' ? 'block' : 'hidden'}`}>
        <label htmlFor="newTemplateName">Template Name:</label>
        <input name='newTemplateName' type="text" className='border-2' />
        <button type='submit'>Create Template</button>
      </form>
    </div>
  );
}

export default Sidebar;
