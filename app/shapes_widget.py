from kivy.app import App
from kivy.uix.widget import Widget
from kivy.graphics import Color, Rectangle, Ellipse, Line
from kivy.properties import StringProperty, ObjectProperty, BooleanProperty

class ShapesWidget(Widget):
    current_mode = StringProperty('none')
    line_color = ObjectProperty((0, 0, 1, 1))
    disabled = BooleanProperty(False)
    
    def on_touch_down(self, touch):
        if self.disabled:
            return False  # Do not process touch events if widget is disabled
        
        super(ShapesWidget, self).on_touch_down(touch)
        touch.ud['start_pos'] = touch.pos
        with self.canvas:
            Color(*self.line_color)  # Use line_color property 

            # Determine which shape to initialize based on current_mode
            if self.current_mode == 'rectangle':
                # Create a placeholder rectangle with minimal size
                touch.ud['shape'] = Rectangle(pos=touch.pos, size=(1, 1))
            elif self.current_mode == 'circle':
                # Create a placeholder ellipse with minimal size
                touch.ud['shape'] = Ellipse(pos=touch.pos, size=(1, 1))

    def on_touch_move(self, touch):
        if self.disabled:
            return False  # Do not process touch events if widget is disabled
        
        if 'shape' in touch.ud and 'start_pos' in touch.ud:
            start_pos = touch.ud['start_pos']
            # Calculate size based on distance from start_pos to current touch position
            width = touch.x - start_pos[0]
            height = touch.y - start_pos[1]
            
            # Update the shape's size and position
            if self.current_mode == 'rectangle':
                touch.ud['shape'].pos = start_pos
                touch.ud['shape'].size = (width, height)
            elif self.current_mode == 'circle':
                # For circles, use the max of width and height to keep the aspect ratio 1:1
                max_side = max(abs(width), abs(height))
                touch.ud['shape'].size = (max_side, max_side)
                touch.ud['shape'].pos = (start_pos[0], start_pos[1])

    def on_touch_up(self, touch):
        if self.disabled:
            return False  # Do not process touch events if widget is disabled
        # Final adjustments or cleanup after touch up can be added here
        pass

