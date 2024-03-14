const apiUrl = process.env.NEXT_PUBLIC_RESOURCE_CANVAS_TEMPLATES_URL;
import { useAuth } from "@/contexts/auth";

function useCanvasTemplates() {
  const { tokens, user } = useAuth();

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: user ? `Bearer ${tokens.access}` : "",
    },
  };

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
      const response = await fetch(`${apiUrl}/${templateId}/`, options);
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

  async function deleteCanvasTemplate(templateId) {
    try {
      await fetch(`${apiUrl}/${templateId}/`, {
        method: "DELETE",
        ...options,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async function updateCanvasTemplate(templateId, updatedTemplate) {
    try {
      await fetch(`${apiUrl}/${templateId}/`, {
        method: "PUT",
        body: JSON.stringify(updatedTemplate),
        ...options,
      });
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error) {
    console.error(error);
  }

  return {
    getCanvasTemplate,
    getCanvasTemplatesList,
    createCanvasTemplate,
    deleteCanvasTemplate,
    updateCanvasTemplate,
  };
}

export default useCanvasTemplates;
