import { useEffect, useState } from 'react';
import useCanvasTemplates from '@/api/canvas-templates';
import ColorPickerModal from './ColorPickerModal';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

const Sidebar = ({ selectedShape, setSelectedShape, addShape, handleUndo, handleRedo, addText, importTemplate, exportTemplate, currentColor, setCurrentColor }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100%', padding: '20px', background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', zIndex: 1000 }}>
       <DropdownButton id="shape-selector" title="Select Shape" onSelect={setSelectedShape} variant="outline-secondary" size="sm" className="mb-2">
        <Dropdown.Item eventKey='Star'>Star</Dropdown.Item>
        <Dropdown.Item eventKey='Circle'>Circle</Dropdown.Item>
        <Dropdown.Item eventKey='Rect'>Rectangle</Dropdown.Item>
      </DropdownButton>
      <Button onClick={addShape} variant="outline-secondary" size="sm" className="mb-2">Add Shape</Button>
      <Button onClick={handleUndo} variant="outline-secondary" size="sm" className="mb-2">Undo</Button>
      <Button onClick={handleRedo} variant="outline-secondary" size="sm" className="mb-2">Redo</Button>
      <ColorPickerModal currentColor={currentColor} setCurrentColor={setCurrentColor} />
      <Button onClick={addText} variant="outline-secondary" size="sm" className="mb-2">Add Text</Button>
      <TemplatesToolbar importTemplate={importTemplate} exportTemplate={exportTemplate} />
    </div>
  );
};

function TemplatesToolbar({ importTemplate, exportTemplate }) {
  const {
    getCanvasTemplate,
    getCanvasTemplatesList,
    createCanvasTemplate,
    deleteCanvasTemplate,
    updateCanvasTemplate,
  } = useCanvasTemplates();
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
    if (templateId === "create" || templateId === "select") {
      setSelectedTemplate(templateId);
    } else {
      const response = await getCanvasTemplate(templateId);
      setSelectedTemplate(response);
    }
  }

  async function handleCreateTemplate(event) {
    event.preventDefault();
    const newTemplateName = event.target.newTemplateName.value;
    const templateNames = templates.map((template) => template.name);
    if (newTemplateName === "" || templateNames.includes(newTemplateName)) {
      alert("Template name not available. Please choose a different name.");
    } else {
      const templateObjects = exportTemplate();
      const newCanvasTemplate = {
        name: newTemplateName,
        description: "to do",
        konva_objects: templateObjects,
      };
      const response = await createCanvasTemplate(newCanvasTemplate);
      setSelectedTemplate(response);
    }
    event.target.reset();
  }

  async function handleDeleteTemplate() {
    const confirm = window.confirm(
      `Are you sure you want to delete the template "${selectedTemplate.name}"?`
    );
    if (confirm) {
      await deleteCanvasTemplate(selectedTemplate.id);
      setSelectedTemplate({});
    } else {
      alert("Template was not deleted.");
    }
  }

  async function handleUpdateTemplate() {
    const confirm = window.confirm(
      `Are you sure you want to update the template "${selectedTemplate.name}"?`
    );
    if (confirm) {
      const templateObjects = exportTemplate();
      const updatedTemplate = {
        ...selectedTemplate,
        konva_objects: templateObjects,
      };
      await updateCanvasTemplate(selectedTemplate.id, updatedTemplate);
    } else {
      alert("Template was not updated.");
    }
  }

  function handleAddTemplate() {
    importTemplate(selectedTemplate.konva_objects);
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

      <form
        onSubmit={handleCreateTemplate}
        className={`flex flex-col ${
          selectedTemplate === "create" ? "block" : "hidden"
        }`}
      >
        <label htmlFor="newTemplateName">Template Name:</label>
        <input name="newTemplateName" type="text" className="border-2" />
        <button type="submit">Create Template</button>
      </form>

      <div
        className={`flex flex-col ${selectedTemplate.id ? "block" : "hidden"}`}
      >
        <button onClick={handleUpdateTemplate}>Update Template</button>
        <button onClick={handleDeleteTemplate}>Delete Template</button>
      </div>
    </div>
  );
}

export default Sidebar;
