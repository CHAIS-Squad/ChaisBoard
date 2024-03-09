from kivy.app import App
from kivy.uix.widget import Widget
from kivy.graphics import Color, Line
from kivy.properties import ObjectProperty, BooleanProperty

class DrawingWidget(Widget):
    line_color = ObjectProperty((1, 0, 0, 1))  # Default to red color
    current_mode = ObjectProperty('drawing')  # Default mode is 'drawing'
    disabled = BooleanProperty(False)

    def on_touch_down(self, touch):
        if self.disabled:
            return False  # Do not process touch events if widget is disabled
        
        app = App.get_running_app()
        if app.current_mode == 'drawing':
            with self.canvas:
                self.canvas.add(Color(*self.line_color))
                d = 10.
                touch.ud['line'] = Line(points=(touch.x, touch.y))
            
    def on_touch_move(self, touch):
        if self.disabled:
            return False  # Do not process touch events if widget is disabled
        
        if 'line' in touch.ud:
            touch.ud['line'].points += [touch.x, touch.y]
            
    def on_touch_up(self, touch):
        if self.disabled:
            return False  # Do not process touch events if widget is disabled
        # Final adjustments or cleanup after touch up can be added here
        pass
