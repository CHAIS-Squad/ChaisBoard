import React, { useEffect, useRef } from 'react';
import { Layer, Star, Circle, Rect, Arrow, Transformer } from 'react-konva';

export default function DraggableShapes({
  shapes,
  onDragStart,
  onDragEnd,
  selection,
  setSelection,
}) {
  const transformerRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    const updateTransformerNodes = () => {
      if (transformerRef.current) {
        if (selection.id) {
          const selectedNode = transformerRef.current.getStage().findOne(`#${selection.id}`);
          transformerRef.current.nodes([selectedNode]);
        } else {
          transformerRef.current.nodes([]);
        }
        transformerRef.current.getLayer().batchDraw();
      }
    };

    const checkDeselect = (e) => {
      if (e.target === e.target.getStage()) {
        setSelection({ type: null, id: null });
      }
    };

    const stage = transformerRef.current?.getStage();
    if (stage) {
      // Update transformer nodes initially
      updateTransformerNodes();
      // Listen for stage clicks to handle deselection
      stage.on('click tap', checkDeselect);
      // Clean up event listener on component unmount or re-render
      return () => stage.off('click tap', checkDeselect);
    }
  }, [selection, shapes, setSelection]);


  return (
    <Layer>
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
          onDragStart: (e) => {
            e.cancelBubble = true;
            onDragStart(shape.id);
            // Select shape on drag start
            setSelection({ type: shape.shapeType, id: shape.id });
          },
          onDragEnd: (e) => {
            e.cancelBubble = true;
            onDragEnd(shape.id, { x: e.target.x(), y: e.target.y() });
          },
          scaleX: shape.isDragging ? 1.2 : 1,
          scaleY: shape.isDragging ? 1.2 : 1,
          // New: select shape on click
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
