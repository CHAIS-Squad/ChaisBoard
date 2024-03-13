import dynamic from 'next/dynamic';
import { Stage, Layer, Line, Rect, Text } from 'react-konva';
import { useState, useEffect, useRef } from 'react';

export default function Whiteboard({ lines }) {
  return (
    <Layer>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke={line.color}
          strokeWidth={3}
          lineCap='round'
          lineJoin='round'
        />
      ))}
    </Layer>
  );
}
