import { useState, useEffect, useRef } from 'react';
import { Layer, Text, Group } from 'react-konva';

export default function TextEditor({
  id,
  text,
  position,
  isDragging,
  onDragStart,
  onDragEnd,
  onUpdate,
  editing,
  onDoubleClick,
}) {
  // Handle text change in input field and update the state
  const handleInputChange = (event) => {
    onUpdate(id, event.target.value);
  };

  return (
    <Layer>
      {editing ? (
        <Group>
          <Text
            x={position.x}
            y={position.y}
            text=""
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDblClick={onDoubleClick}
          />
          <input
            type="text"
            value={text}
            style={{ position: 'absolute', left: position.x, top: position.y }}
            onChange={handleInputChange}
            onDoubleClick={onDoubleClick}
          />
        </Group>
      ) : (
        <Text
          x={position.x}
          y={position.y}
          text={text}
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDblClick={onDoubleClick}
        />
      )}
    </Layer>
  );
}
