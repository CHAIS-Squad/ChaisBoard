# main.py
from kivy.app import App
from kivy.properties import ObjectProperty, StringProperty
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.colorpicker import ColorPicker
from kivy.uix.popup import Popup
from kivy.uix.floatlayout import FloatLayout
from app.shapes_widget import ShapesWidget
from app.drawing_widget import DrawingWidget

from app.drawing_widget import DrawingWidget

class ModeSwitchApp(App):
    current_mode = StringProperty('drawing')  # Manage current mode here
    line_color = ObjectProperty((1, 0, 0))  # Default drawing color

    def build(self):
        self.title = 'Mode Switch Paint with ColorPicker'
        self.root_layout = FloatLayout()
        
        self.drawing_widget = DrawingWidget()
        self.shapes_widget = ShapesWidget()
        
        # Initialize control_panel before adding widgets to it
        self.control_panel = BoxLayout(size_hint_y=None, height=50, orientation='horizontal')
        self.setup_control_panel()  # Now control_panel exists and can be setup

        # Add widgets to the root_layout
        self.root_layout.add_widget(self.shapes_widget)
        self.root_layout.add_widget(self.drawing_widget)
        self.root_layout.add_widget(self.control_panel)  # Add the control panel to the root layout
        
        # Manage the initial active mode
        self.switch_mode_initial('drawing')

        return self.root_layout
    
    def setup_control_panel(self):
        # Setup the button layout including color picker, mode switch, and clear button
        color_picker_btn = Button(text='Pick Color')
        color_picker_btn.bind(on_press=self.open_color_picker)
        self.control_panel.add_widget(color_picker_btn)
        
        # Shape selection buttons initially hidden and disabled
        self.rectangle_btn = Button(text='Rectangle', opacity=0, disabled=True)
        self.rectangle_btn.bind(on_press=lambda instance: self.set_shape_mode('rectangle'))
        self.control_panel.add_widget(self.rectangle_btn)

        self.circle_btn = Button(text='Circle', opacity=0, disabled=True)
        self.circle_btn.bind(on_press=lambda instance: self.set_shape_mode('circle'))
        self.control_panel.add_widget(self.circle_btn)

        # Mode switch button
        mode_switch_btn = Button(text='Switch to Shapes')
        mode_switch_btn.bind(on_press=self.switch_mode)
        self.control_panel.add_widget(mode_switch_btn)
        
        # Clear canvas button
        clear_btn = Button(text='Clear')
        clear_btn.bind(on_release=self.clear_canvas)
        self.control_panel.add_widget(clear_btn)
        

    def open_color_picker(self, instance):
        color_picker = ColorPicker()

        popup = Popup(title="Pick a color", content=color_picker,
                      size_hint=(None, None), size=(400, 400))
        
        color_picker.bind(color=self.on_color_pick)

        popup.open()

    def on_color_pick(self, instance, value):
        self.line_color = instance.color  # Update the app-level color
        # Update the line_color for both widgets to the newly selected color
        self.drawing_widget.line_color = self.line_color
        self.shapes_widget.line_color = self.line_color

    def set_shape_mode(self, shape):
        self.current_mode = shape
        self.shapes_widget.current_mode = shape  # Update ShapesWidget with the selected shape mode
        
        # Ensure that the ShapesWidget uses the current line color.
        self.shapes_widget.line_color = self.line_color
    
    def switch_mode_initial(self, mode):
        """A method to manage the initial mode setup without affecting the button text."""
        self.current_mode = mode
        if mode == 'drawing':
            self.shapes_widget.disabled = True
            self.drawing_widget.disabled = False
            self.current_widget = self.drawing_widget
        else:
            self.shapes_widget.disabled = False
            self.drawing_widget.disabled = True
            self.current_widget = self.shapes_widget
               
    def switch_mode(self, instance):
        if self.current_mode == 'drawing':
            self.current_mode = 'shapes'
            self.drawing_widget.disabled = True  # Disable drawing widget
            self.shapes_widget.disabled = False  # Enable shapes widget
            self.rectangle_btn.disabled = False  # Enable rectangle button
            self.rectangle_btn.opacity = 1       # Make rectangle button visible
            self.circle_btn.disabled = False     # Enable circle button
            self.circle_btn.opacity = 1           # Make circle button visible
            instance.text = 'Switch to Drawing'
        else:
            self.current_mode = 'drawing'
            self.drawing_widget.disabled = False  # Enable drawing widget
            self.shapes_widget.disabled = True  # Disable shapes widget
            self.rectangle_btn.disabled = True   # Disable rectangle button
            self.rectangle_btn.opacity = 0       # Hide rectangle button
            self.circle_btn.disabled = True     # Disable circle button
            self.circle_btn.opacity = 0         # Hide circle button
            instance.text = 'Switch to Shapes'

    def clear_canvas(self, instance):
        # self.current_widget.canvas.clear()
        # Clear the canvas of both the drawing and shapes widgets
        self.drawing_widget.canvas.clear()
        self.shapes_widget.canvas.clear()

if __name__ == '__main__':
    ModeSwitchApp().run()
