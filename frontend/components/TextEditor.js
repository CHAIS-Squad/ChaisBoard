import { useState, useEffect, useRef } from 'react';
import { Layer, Text, Group, Transformer } from 'react-konva';

export default function TextEditor({
  id,
  text,
  position,
  color,
  fontSize,
  isDragging,
  onDragStart,
  onDragEnd,
  onUpdate,
  editing,
  onDoubleClick,
  isSelected,
}) {
  console.log(`Rendering TextEditor ${id} with props:`, { id, text, position, color, editing, isSelected });

  const textRef = useRef(null);
  const transformerRef = useRef(null);
  const [editingText, setEditingText] = useState(text);

  // Effect to handle the creation and removal of the textarea for editing
  useEffect(() => {
    if (editing) {
      const textareaElement = document.createElement('textarea');

      // Position and style the textarea
      textareaElement.value = editingText;
      textareaElement.style.position = 'absolute';
      textareaElement.style.top = `${position.y}px`;
      textareaElement.style.left = `${position.x}px`;
      textareaElement.style.fontSize = '16px';
      document.body.appendChild(textareaElement);
      textareaElement.focus();

      // Handle outside click and Enter key to update and remove textarea
      const handleOutsideClickOrEnter = (e) => {
        if (e.type === 'click' && e.target !== textareaElement || e.key === 'Enter') {
          setEditingText(textareaElement.value);
          onUpdate(id, { text: textareaElement.value });
          document.body.removeChild(textareaElement);
        }
      };

      window.addEventListener('click', handleOutsideClickOrEnter);
      textareaElement.addEventListener('keydown', handleOutsideClickOrEnter);

      // Cleanup function to remove event listeners and the textarea
      return () => {
        window.removeEventListener('click', handleOutsideClickOrEnter);
        textareaElement.removeEventListener('keydown', handleOutsideClickOrEnter);
        if (document.body.contains(textareaElement)) {
          document.body.removeChild(textareaElement);
        }
      };
    }
  }, [editing, id, onUpdate, position, editingText]);

  // Effect for handling Konva Transformer
  useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // Handle resize and transform end
  const handleTransformEnd = () => {
    if (textRef.current) {
      const node = textRef.current;
      const scaleX = node.scaleX();
  
      // Calculate new font size based on the scale factor
      const newFontSize = Math.max(12, node.fontSize() * scaleX);
  
      onUpdate(id, {
        text: editingText, // Keep the current text
        fontSize: newFontSize, // Update font size directly
        position: { x: node.x(), y: node.y() } // Update position separately
      });
  
      // Reset the scale to avoid affecting appearance and ensure changes "stick"
      node.scaleX(1);
      node.scaleY(1);
      node.getLayer().batchDraw();
    }
  };
  
  

  return (
    <Group>
      <Text
        x={position.x}
        y={position.y}
        text={!editing ? editingText : ''}
        fontSize={fontSize}
        fill={color}
        draggable={!editing}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDblClick={onDoubleClick}
        ref={textRef}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          keepRatio={true}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        />
      )}
    </Group>
  );
}
