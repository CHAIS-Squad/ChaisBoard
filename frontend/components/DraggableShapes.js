import React, { useEffect, useRef } from 'react';
import { Layer, Star, Circle, Rect, Arrow, Transformer } from 'react-konva';

export default function DraggableShapes({
  shapes,
  onDragStart,
  onDragEnd,
  selection,
  setSelection,
  selectedObjects,
}) {
  const transformerRef = useRef(null);
  const layerRef = useRef(null);

  // useEffect(() => {
  //   if (transformerRef.current) {
  //     if (selection.id) {
  //       // Attempt to find the selected node using the selection.id
  //       const selectedNode = transformerRef.current.getStage().findOne(`#${selection.id}`);
  //       // Ensure selectedNode is defined before attempting to use it
  //       if (selectedNode) {
  //         transformerRef.current.nodes([selectedNode]);
  //       } else {
  //         // If no node was found, clear the transformer's nodes array
  //         transformerRef.current.nodes([]);
  //       }
  //     } else {
  //       // If there's no selection, also clear the transformer's nodes array
  //       transformerRef.current.nodes([]);
  //     }
  //     transformerRef.current.getLayer().batchDraw();
  //   }
  // }, [selection, shapes]);

  useEffect(() => {
    // Check if the transformer exists
    if (transformerRef.current) {
      let nodes = [];

      // Handle individual selection
      if (selection.id && !selectedObjects.length) {
        const selectedNode = transformerRef.current
          .getStage()
          .findOne(`#${selection.id}`);
        if (selectedNode) {
          nodes = [selectedNode];
        }
      }
      // Handle multiple selections from the selection rectangle
      else if (selectedObjects.length > 0) {
        nodes = selectedObjects
          .map(({ id }) => transformerRef.current.getStage().findOne(`#${id}`))
          .filter((node) => node); // Filter out undefined to ensure only valid nodes are included
      }

      // Update transformer nodes based on current selection
      transformerRef.current.nodes(nodes);

      // Ensure we redraw the layer to reflect changes
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selection, selectedObjects, shapes]); // Depend on both selection and selectedObjects

  return (
    <Layer ref={layerRef}>
      {shapes.map((shape) => {
        const commonProps = {
          key: shape.id,
          id: shape.id,
          x: shape.x,
          y: shape.y,
          rotation: shape.rotation,
          draggable: true,
          fill: shape.color,
          stroke: shape.color,
          scaleX: shape.scaleX, // Use scaleX from shape's state
          scaleY: shape.scaleY, // Use scaleY from shape's state
          onDragStart: (e) => {
            e.cancelBubble = true;
            onDragStart(shape.id);
            // Select shape on drag start
            setSelection({ type: shape.shapeType, id: shape.id });
          },
          onDragEnd: (e) => {
            e.cancelBubble = true;
            if (e.target) {
              // Ensure e.target exists before accessing properties
              onDragEnd(shape.id, {
                x: e.target.x(),
                y: e.target.y(),
                scaleX: e.target.scaleX() || 1, // Use existing scale or default to 1
                scaleY: e.target.scaleY() || 1, // Use existing scale or default to 1
              });
            } else {
              console.error('Drag end event target is undefined');
            }
          },
          // Removed the isDragging scaling logic
          onClick: () => setSelection({ type: shape.shapeType, id: shape.id }),
        };

        // Return the appropriate Konva shape component for each shape
        switch (shape.shapeType) {
          case 'Star':
            return (
              <Star
                {...commonProps}
                numPoints={5}
                innerRadius={20}
                outerRadius={40}
              />
            );
          case 'Circle':
            return <Circle {...commonProps} radius={30} />;
          case 'Rect':
            return <Rect {...commonProps} width={50} height={50} />;
          case 'LeftArrow':
          case 'RightArrow':
            const points =
              shape.shapeType === 'LeftArrow'
                ? [100, 50, 0, 50]
                : [0, 50, 100, 50];
            return (
              <Arrow
                {...commonProps}
                points={points}
                pointerLength={10}
                pointerWidth={10}
              />
            );
          default:
            console.log('Unknown shape type:', shape.shapeType);
            return null;
        }
      })}
      {/* Transformer component */}
      <Transformer ref={transformerRef} />
    </Layer>
  );
}
