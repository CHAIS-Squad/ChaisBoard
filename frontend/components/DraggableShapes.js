import React, { useState } from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

export default function DraggableShapes() {
  const [stars, setStars] = useState(generateShapes());

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => ({
        ...star,
        isDragging: star.id === id,
      }))
    );
  };

  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => ({
        ...star,
        isDragging: false,
      }))
    );
  };

  return (
    <Layer>
      <Text text='Try to drag a star' fontSize={24} fill='#555' padding={20} />
      {stars.map((star, index) => (
        <Star
          key={star.id}
          id={star.id}
          x={star.x}
          y={star.y}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          fill='#89b717'
          opacity={0.8}
          draggable
          rotation={star.rotation}
          shadowColor='black'
          shadowBlur={10}
          shadowOpacity={0.6}
          shadowOffsetX={star.isDragging ? 10 : 5}
          shadowOffsetY={star.isDragging ? 10 : 5}
          scaleX={star.isDragging ? 1.2 : 1}
          scaleY={star.isDragging ? 1.2 : 1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      ))}
    </Layer>
  );
}