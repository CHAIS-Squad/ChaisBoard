import { useEffect, useState } from "react";
import useCanvasTemplates from "@/api/canvas-templates";
import { useAuth } from "@/contexts/auth";
import {
  Button,
  Dropdown,
  SplitButton,
  Form,
  InputGroup,
} from "react-bootstrap";

function TemplatesToolbar({ importTemplate, exportTemplate }) {
  const {
    getCanvasTemplate,
    getCanvasTemplatesList,
    createCanvasTemplate,
    deleteCanvasTemplate,
    updateCanvasTemplate,
    getCanvasTemplatePublic,
    getCanvasTemplatesListPublic,
  } = useCanvasTemplates();
  const { user } = useAuth();

  const [userTemplates, setUserTemplates] = useState([]);
  const [publicTemplates, setPublicTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [templateSelector, setTemplateSelector] = useState("select");

  useEffect(() => {
    updateTemplateSelector();
  }, [selectedTemplate, user]);

  async function updateTemplateSelector() {
    if (user) {
      const userTemplates = await getCanvasTemplatesList();
      setUserTemplates(userTemplates);
    }
    const publicTemplates = await getCanvasTemplatesListPublic();
    setPublicTemplates(publicTemplates);
  }

  async function retrieveTemplate(event) {
    const templateId = event.target.value;
    setTemplateSelector(templateId);
    if (templateId === "create" || templateId === "select") {
      setSelectedTemplate(templateId);
    } else if (templateId.startsWith("public")) {
      const response = await getCanvasTemplatePublic(templateId.split("-")[1]);
      setSelectedTemplate(response);
    } else if (templateId.startsWith("user")) {
      const response = await getCanvasTemplate(templateId.split("-")[1]);
      setSelectedTemplate(response);
    }
  }

  async function handleCreateTemplate(event) {
    event.preventDefault();
    const newTemplateName = event.target.newTemplateName.value;
    event.target.reset();
    const templateNames = userTemplates.map((template) => template.name);
    if (newTemplateName === "" || templateNames.includes(newTemplateName)) {
      alert("Template name not available. Please choose a different name.");
    } else {
      const templateObjects = exportTemplate();
      const newCanvasTemplate = {
        name: newTemplateName,
        description: "to do",
        konva_objects: templateObjects,
        owner: user.id,
      };
      const response = await createCanvasTemplate(newCanvasTemplate);
      setSelectedTemplate(response);
      setTemplateSelector(`user-${response.id}`);
    }
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
      setSelectedTemplate(updatedTemplate);
    } else {
      alert("Template was not updated.");
    }
  }

  return (
    <div className="flex flex-col mt-4 bg-neutral-200">
      <div className="flex flex-col mx-auto mt-2 w-11/12">
        <label htmlFor="templateSelector" className="mb-2 text-sm text-center">
          Import Template:
        </label>
        <Form.Select
          name="templateSelector"
          id="templateSelector"
          onChange={retrieveTemplate}
          value={templateSelector} 
          size="sm"
          className="mb-2"
        >
          <option value="select">Select Template</option>
          {user ? <option value="create">Create New</option> : null}
          {publicTemplates &&
            publicTemplates.map((template) => {
              return (
                <option
                  key={`public-${template.id}`}
                  value={`public-${template.id}`}
                >
                  ChaisBoard: {template.name}
                </option>
              );
            })}
          {userTemplates &&
            userTemplates.map((template) => {
              return (
                <option
                  key={`user-${template.id}`}
                  value={`user-${template.id}`}
                >
                  {template.name}
                </option>
              );
            })}
        </Form.Select>
        <Form
          onSubmit={handleCreateTemplate}
          className={`mb-2 ${
            selectedTemplate === "create" ? "block" : "hidden"
          }`}
        >
          <InputGroup>
            <Form.Control
              name="newTemplateName"
              type="text"
              placeholder="Template Name"
              size="sm"
              className="mb-2"
            />
            <Button
              type="submit"
              variant="outline-secondary"
              size="sm"
              disabled={!user}
              className="mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </InputGroup>
        </Form>

        <Button
          variant="outline-secondary"
          size="sm"
          disabled={!selectedTemplate.id}
          onClick={() => importTemplate(selectedTemplate.konva_objects)}
          className="mb-2"
        >
          Add Template
        </Button>
      </div>

      <div className={`mx-auto w-11/12 ${user ? "block" : "hidden"}`}>
        <div
          className={`flex flex-col ${
            selectedTemplate.id && user && selectedTemplate.owner === user.id
              ? "block"
              : "hidden"
          }`}
        >
          <SplitButton
            title="Update"
            variant="outline-secondary"
            size="sm"
            drop="up"
            align={{ offset: [0, 0] }}
            onClick={handleUpdateTemplate}
            className="mb-2"
          >
            <Dropdown.Item onClick={handleDeleteTemplate}>Delete</Dropdown.Item>
          </SplitButton>
        </div>
      </div>
    </div>
  );
}

export default TemplatesToolbar;
