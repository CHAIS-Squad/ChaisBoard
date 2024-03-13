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

  // function getCanvasTemplate(templateName) {
  //   const templateObjects = [
      // {
      //   "id": "linked_list",
      //   "shapeType": "Circle",
      //   "x": 220,
      //   "y": 225.49816409868518,
      //   "rotation": 117.50656501577862,
      //   "isDragging": false,
      // },
      // {
      //   "id": "linked_list_1",
      //   "shapeType": "Circle",
      //   "x": 811.4166231727013,
      //   "y": 608.3049074648346,
      //   "rotation": 133.62903742079496,
      //   "isDragging": false,
      // },
  //   ];

  //   if (templateName === "linked_list") {
  //     return templateObjects;
  //   }
  // }

  return { getCanvasTemplate, getCanvasTemplatesList };
}

function handleError(error) {
  console.error(error);
}

export default useCanvasTemplates;
