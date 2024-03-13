import { useState, useEffect, useRef } from 'react';
import { Layer, Text, Group } from 'react-konva';

export default function TextEditor({
  id,
  text,
  position,
  color,
  isDragging,
  onDragStart,
  onDragEnd,
  onUpdate,
  editing,
  onDoubleClick,
}) {

  useEffect(() => {
    if (editing) {
      // Creating a text area outside of canvas to allow for html elements
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      // Defaults for text area
      // Places the text area on top of the text to give off illusion of changing the text.
      textarea.value = text;
      textarea.style.position = 'absolute';
      textarea.style.top = `${position.y}px`;
      textarea.style.left = `${position.x}px`;
      textarea.style.width = 'auto'; // Can adjust all these down for different stylings of text editor
      textarea.style.height = 'auto'; 
      textarea.style.fontSize = '16px'; 

      textarea.focus();

      // Handles entering edits
      // Currently requires enter key to post edit.
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          onUpdate(id, textarea.value);
          document.body.removeChild(textarea);
        }
      };

      // Function to handle click outside of textarea
      const handleOutsideClick = (e) => {
        if (e.target !== textarea) {
          onUpdate(id, textarea.value);
          document.body.removeChild(textarea);
        }
      };

      textarea.addEventListener('keydown', handleKeyDown);
      // Add click listener to the document to detect clicks outside the textarea
      document.addEventListener('click', handleOutsideClick);

      return () => {
        // Cleanup both event listeners
        textarea.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('click', handleOutsideClick);
        if (document.body.contains(textarea)) {
          document.body.removeChild(textarea);
        }
      };
    }
  }, [editing, id, onUpdate, text, position]);

  return (
    <Group>
      <Text
        x={position.x}
        y={position.y}
        text={editing ? '' : text}
        fill={color}
        draggable
        onDragStart={editing ? null : onDragStart}
        onDragEnd={editing ? null : onDragEnd}
        onDblClick={onDoubleClick}
      />
    </Group>
  );
}
