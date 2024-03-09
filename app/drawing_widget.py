from kivy.app import App
from kivy.uix.widget import Widget
from kivy.uix.button import Button
from kivy.graphics import Color, Line

class DrawingWidget(Widget):
    
    def on_touch_down(self, touch):
        app = App.get_running_app()
        if app.current_mode == 'drawing':
            with self.canvas:
                # Use app.line_color for drawing
                self.canvas.add(Color(*app.line_color))
                d = 10.
                touch.ud['line'] = Line(points=(touch.x, touch.y))
            
    def on_touch_move(self, touch):
        # Continue drawing line if in 'drawing' mode
        if 'line' in touch.ud:
            touch.ud['line'].points += [touch.x, touch.y]
