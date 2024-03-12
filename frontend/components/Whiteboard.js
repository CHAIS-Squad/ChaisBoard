import dynamic from 'next/dynamic';
import { Stage, Layer, Line, Rect, Text } from 'react-konva';
import { useState, useEffect, useRef } from 'react';

export default function Whiteboard({ lines }) {
    return (
      <>
        {lines.map((line, i) => (
          <Line key={i} points={line} stroke='black' strokeWidth={5} lineCap='round' lineJoin='round' />
        ))}
      </>
    );
  }
