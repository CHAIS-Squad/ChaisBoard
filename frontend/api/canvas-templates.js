function getCanvasTemplates(templateName) {
  const templateObjects = [
    {
      id: "linked_list",
      shapeType: "Circle",
      x: 220,
      y: 225.49816409868518,
      rotation: 117.50656501577862,
      isDragging: false,
    },
    {
      id: "linked_list_1",
      shapeType: "Circle",
      x: 811.4166231727013,
      y: 608.3049074648346,
      rotation: 133.62903742079496,
      isDragging: false,
    },
  ];

  if (templateName === "linked_list") {
    return templateObjects;
  }
}

export default getCanvasTemplates;
