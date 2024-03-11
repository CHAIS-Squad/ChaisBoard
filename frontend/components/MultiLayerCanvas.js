import React, { useState, useRef } from 'react';
import { Stage } from 'react-konva';
import dynamic from 'next/dynamic';

const Whiteboard = dynamic(() => import('../components/Whiteboard'), { ssr: false });
const DraggableShapes = dynamic(() => import('../components/DraggableShapes'), { ssr: false });

export default function MultiLayerCanvas() {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const handleMouseDown = (e) => {
        // Check if the event target is the Stage to only start drawing if clicking on empty space
        if (e.target === e.target.getStage()) {
            isDrawing.current = true;
            setLines([...lines, []]);
        }
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        if (lastLine) {
            lastLine = [...lastLine, point.x, point.y];
            setLines(lines.slice(0, -1).concat([lastLine]));
        }
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const width = window.innerWidth; // Consider using useState and useEffect for dynamic resizing
    const height = window.innerHeight;

    return (
        <Stage 
            width={width} 
            height={height} 
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
        >
            <Whiteboard lines={lines} />
            <DraggableShapes />
        </Stage>
    );
}
