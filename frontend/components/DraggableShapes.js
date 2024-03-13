import React from 'react';
import { Layer, Star, Circle, Rect, Arrow,Transformer } from 'react-konva';

export default function DraggableShapes({ shapes, onDragStart, onDragEnd }) {
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
        };

        switch (shape.shapeType) {
          case 'Star':
            return <Star {...commonProps} numPoints={5} innerRadius={20} outerRadius={40} fill='#89b717' />;
          case 'Circle':
            return <Circle {...commonProps} radius={30} fill='#007bff' />;
          case 'Rect':
            return <Rect {...commonProps} width={50} height={50} fill='#dc3545' />;
          case 'LeftArrow':
            return <Arrow {...commonProps} points={[100, 50, 0, 50]} pointerLength={10} pointerWidth={10} fill='green' stroke='green' />;
          case 'RightArrow':
            return <Arrow {...commonProps} points={[0, 50, 100, 50]} pointerLength={10} pointerWidth={10} fill='blue' stroke='blue' />;
          default:
            console.log('Unknown shape type:', shape.shapeType);
            return null;
        }
      })}
    </Layer>
  );
}
