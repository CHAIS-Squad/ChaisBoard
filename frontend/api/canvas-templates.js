const apiUrl = process.env.NEXT_PUBLIC_RESOURCE_CANVAS_TEMPLATES_URL;
const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

function useCanvasTemplates() {
  async function getCanvasTemplatesList() {
    try {
      const response = await fetch(`${apiUrl}/list/`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async function getCanvasTemplate(templateId) {
    try {
      const response = await fetch(`${apiUrl}/${templateId}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async function createCanvasTemplate(newTemplate) {
    try {
      const response = await fetch(`${apiUrl}/create/`, {
        method: "POST",
        body: JSON.stringify(newTemplate),
        ...options,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  return { getCanvasTemplate, getCanvasTemplatesList, createCanvasTemplate };
}

function handleError(error) {
  console.error(error);
}

export default useCanvasTemplates;
