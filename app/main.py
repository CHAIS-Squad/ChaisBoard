# main.py
from kivy.app import App
from kivy.properties import ObjectProperty, StringProperty
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.colorpicker import ColorPicker
from kivy.uix.popup import Popup

from app.drawing_widget import DrawingWidget

class ModeSwitchApp(App):
    current_mode = StringProperty('drawing')  # Manage current mode here
    line_color = ObjectProperty((1, 0, 0))  # Default drawing color

    def build(self):
        self.title = 'Mode Switch Paint with ColorPicker'
        parent = BoxLayout(orientation='vertical')
        self.painter = DrawingWidget()

        # UI setup (button layout, clear button, etc.) as before

        # ColorPicker button setup
        color_picker_btn = Button(text='Pick Color', size_hint_y=None, height=50)
        color_picker_btn.bind(on_press=self.open_color_picker)

        # Assuming button_layout is a BoxLayout for buttons
        button_layout = BoxLayout(size_hint_y=None, height=50)
        button_layout.add_widget(color_picker_btn)

        clearbtn = Button(text='Clear')
        clearbtn.bind(on_release=self.clear_canvas)
        button_layout.add_widget(clearbtn)

        parent.add_widget(self.painter)
        parent.add_widget(button_layout)

        return parent

    def open_color_picker(self, instance):
        color_picker = ColorPicker()

        popup = Popup(title="Pick a color", content=color_picker,
                      size_hint=(None, None), size=(400, 400))
        
        color_picker.bind(color=self.on_color_pick)

        popup.open()

    def on_color_pick(self, instance, value):
        self.line_color = instance.color  # Update the app-level color

    def switch_mode(self, instance):
        if self.current_mode == 'drawing':
            self.current_mode = 'shapes'
            instance.text = 'Switch to Drawing'
        else:
            self.current_mode = 'drawing'
            instance.text = 'Switch to Shapes'

    def clear_canvas(self, instance):
        self.painter.canvas.clear()

if __name__ == '__main__':
    ModeSwitchApp().run()
