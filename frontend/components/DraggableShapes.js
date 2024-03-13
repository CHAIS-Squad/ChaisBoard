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
          fill: shape.color,
          stroke: shape.color,
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
            return <Star {...commonProps} numPoints={5} innerRadius={20} outerRadius={40} />;
          case 'Circle':
            return <Circle {...commonProps} radius={30} />;
          case 'Rect':
            return <Rect {...commonProps} width={50} height={50} />;
          case 'LeftArrow':
          case 'RightArrow':
            const points = shape.shapeType === 'LeftArrow' ? [100, 50, 0, 50] : [0, 50, 100, 50];
            return <Arrow {...commonProps} points={points} pointerLength={10} pointerWidth={10} />;
          default:
            console.log('Unknown shape type:', shape.shapeType);
            return null;
        }
      })}
    </Layer>
  );
}
