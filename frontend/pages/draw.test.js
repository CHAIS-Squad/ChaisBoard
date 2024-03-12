// Import necessary dependencies and components
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DrawPage from './DrawPage'; // Assuming DrawPage component is located in the same directory

describe('DrawPage Component', () => {
  test('Color Selection Test', () => {
    // Render the DrawPage component
    const { getByTestId } = render(<DrawPage />);

    // Find color selection element and simulate color change
    const colorPicker = getByTestId('color-picker');
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } });

    // Assert that the color has changed
    expect(colorPicker.value).toBe('#ff0000');
  });

  test('Brush Size Test', () => {
    // Render the DrawPage component
    const { getByTestId } = render(<DrawPage />);

    // Find brush size element and simulate brush size change
    const brushSizeInput = getByTestId('brush-size-input');
    fireEvent.change(brushSizeInput, { target: { value: '10' } });

    // Assert that the brush size has changed
    expect(brushSizeInput.value).toBe('10');
  });
});
