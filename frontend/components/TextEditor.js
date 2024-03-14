import { useState, useEffect, useRef } from 'react';
import { Layer, Text, Group, Transformer } from 'react-konva';

export default function TextEditor({
  id,
  text,
  position,
  color,
  fontSize,
  onDragStart,
  onDragEnd,
  onUpdate,
  editing,
  onDoubleClick,
  isSelected,
  onSelect,
  saveHistory,
}) {
  const textRef = useRef(null);
  const transformerRef = useRef(null);
  const [editingText, setEditingText] = useState(text);

  // Effect to handle the creation and removal of the textarea for editing
  useEffect(() => {
    if (editing) {
      const textareaElement = document.createElement('textarea');

      // Position and style the textarea to match the Konva Text's properties
      textareaElement.value = editingText;
      textareaElement.style.position = 'absolute';
      textareaElement.style.top = `${position.y}px`;
      textareaElement.style.left = `${position.x}px`;
      textareaElement.style.fontSize = `${fontSize}px`;
      textareaElement.style.lineHeight = 'normal';
      textareaElement.style.height = 'auto';
      textareaElement.style.wordWrap = 'break-word';
      textareaElement.style.whiteSpace = 'pre-wrap';
      textareaElement.style.resize = 'none';

      document.body.appendChild(textareaElement);
      textareaElement.focus();

      const handleTextareaKeyDown = (e) => {
        // Only stop propagation for Enter key without Shift
        if (e.key === 'Enter' && !e.shiftKey) {
          e.stopPropagation();
          setEditingText(textareaElement.value);
          onUpdate(id, { text: textareaElement.value, fontSize: fontSize });
          document.body.removeChild(textareaElement);
        }
      };

      const handleOutsideClick = (e) => {
        if (e.type === 'click' && e.target !== textareaElement) {
          setEditingText(textareaElement.value);
          onUpdate(id, { text: textareaElement.value, fontSize: fontSize });
          document.body.removeChild(textareaElement);
        }
      };

      // Listen for keydown events on the textarea
      textareaElement.addEventListener('keydown', handleTextareaKeyDown);
      // Listen for click events on the window
      window.addEventListener('click', handleOutsideClick);

      return () => {
        // Cleanup
        textareaElement.removeEventListener('keydown', handleTextareaKeyDown);
        window.removeEventListener('click', handleOutsideClick);
        if (document.body.contains(textareaElement)) {
          document.body.removeChild(textareaElement);
        }
      };
    }
  }, [editing, id, onUpdate, position, editingText, fontSize]);

  // Effect for handling Konva Transformer
  // useEffect(() => {
  //   if (isSelected && transformerRef.current) {
  //     transformerRef.current.nodes([textRef.current]);
  //     transformerRef.current.getLayer().batchDraw();
  //   }
  // }, [isSelected]);
  useEffect(() => {
    if (transformerRef.current) {
      if (isSelected) {
        // Attach the transformer to the selected node
        transformerRef.current.nodes([textRef.current]);
      } else {
        // Ensure the transformer is detached from all nodes when not selected
        if (transformerRef.current.nodes().length) {
          transformerRef.current.detach();
        }
      }
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
        position: { x: node.x(), y: node.y() }, // Update position separately
      });

      // Reset the scale to avoid affecting appearance and ensure changes "stick"
      node.scaleX(1);
      node.scaleY(1);
      node.getLayer().batchDraw();
    }
  };

  const handleTextClick = () => {
    // Invoke onSelect function to select the text without enabling editing mode
    onSelect('text', id, false); // Pass false to indicate it's not a double-click
  };

  // Define handleDoubleClick to handle double-click editing
  const handleDoubleClick = () => {
    // Invoke onSelect function to select the text and enable editing mode
    onSelect('text', id, true); // Pass true to indicate it's a double-click
  };

  return (
    <Group>
      <Text
        id={id}
        x={position.x}
        y={position.y}
        text={!editing ? editingText : ''}
        fontSize={fontSize}
        fill={color}
        draggable={!editing}
        onDragStart={(e) => onDragStart(id, e)}
        onDragEnd={(e) => onDragEnd(id, e)}
        onClick={handleTextClick}
        onDblClick={handleDoubleClick}
        ref={textRef}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          keepRatio={true}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
        />
      )}
    </Group>
  );
}
