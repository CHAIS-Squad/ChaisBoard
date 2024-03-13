import React from 'react';
import { Layer, Star, Circle, Rect, Text } from 'react-konva';

export default function DraggableShapes({ shapes, onDragStart, onDragEnd }) {
  return (
    <>
      <Layer>
        {shapes.map((shape) => {
          const commonProps = {
            key: shape.id,
            id: shape.id,
            x: shape.x,
            y: shape.y,
            rotation: shape.rotation,
            draggable: true,
            onDragStart: (e) => {
              e.cancelBubble = true;
              onDragStart(shape.id);
            },
            onDragEnd: (e) => {
              e.cancelBubble = true;
              onDragEnd(shape.id, { x: e.target.x(), y: e.target.y() });
            },
            scaleX: shape.isDragging ? 1.2 : 1,
            scaleY: shape.isDragging ? 1.2 : 1,
            shadowOffsetX: shape.isDragging ? 10 : 5,
            shadowOffsetY: shape.isDragging ? 10 : 5,
            shadowBlur: 10,
            shadowOpacity: 0.6,
          };

          switch (shape.shapeType) {
            case 'Star':
              return (
                <Star
                  {...commonProps}
                  numPoints={5}
                  innerRadius={20}
                  outerRadius={40}
                  fill='#89b717'
                />
              );
            case 'Circle':
              return <Circle {...commonProps} radius={30} fill='#007bff' />;
            case 'Rect':
              return (
                <Rect {...commonProps} width={50} height={50} fill='#dc3545' />
              );
            default:
              console.log('Unknown shape type:', shape.shapeType); // This helps identify if the shapeType is not what you expect
              return null;
          }
        })}
      </Layer>
    </>
  );
}