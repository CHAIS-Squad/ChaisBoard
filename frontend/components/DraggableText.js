import { Layer, Text } from 'react-konva';

export default function DraggableText({ text, position, isDragging, onDragStart, onDragEnd }) {
    return (
        <>
        <Layer>
        <Text
            text={text}
            x={position.x}
            y={position.y}
            draggable
            fill={isDragging ? 'green' : 'black'}
            onDragStart={onDragStart}
            onDragEnd={(e) => onDragEnd(e)}
            />

        </Layer>
        </>
    )
}