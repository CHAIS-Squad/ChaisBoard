import React from 'react';
import dynamic from 'next/dynamic';

import { Stage, Layer, Rect, Text } from 'react-konva';
const Whiteboard = dynamic(() => import('../components/Whiteboard'), {
  ssr: false,
});
const DraggableShapes = dynamic(() => import('../components/DraggableShapes'), {
  ssr: false,
});

export default function MultiLayerCanvas() {
  
    const width = 1000; // Example fixed size or could be based on state/window
    const height = 800;

    return (
      <div style={{ position: 'relative', width: width, height: height }}>
        {/* First Canvas */}
        <Whiteboard width={width} height={height} />
        <DraggableShapes />
      </div>
    );
  }

