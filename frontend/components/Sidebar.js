import ColorPickerModal from './ColorPickerModal';
import TemplatesToolbar from './TemplatesToolbar';
import UserManager from './UserManager';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

const Sidebar = ({ selectedShape, setSelectedShape, addShape, handleUndo, handleRedo, addText, importTemplate, exportTemplate, currentColor, setCurrentColor }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100%', padding: '20px', background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', zIndex: 1000 }}>
       <DropdownButton id="shape-selector" title="Select Shape" onSelect={setSelectedShape} variant="outline-secondary" size="sm" className="mb-2">
        <Dropdown.Item eventKey='Star'>Star</Dropdown.Item>
        <Dropdown.Item eventKey='Circle'>Circle</Dropdown.Item>
        <Dropdown.Item eventKey='Rect'>Rectangle</Dropdown.Item>
      </DropdownButton>
      <Button onClick={addShape} variant="outline-secondary" size="sm" className="mb-2">Add Shape</Button>
      <Button onClick={handleUndo} variant="outline-secondary" size="sm" className="mb-2">Undo</Button>
      <Button onClick={handleRedo} variant="outline-secondary" size="sm" className="mb-2">Redo</Button>
      <ColorPickerModal currentColor={currentColor} setCurrentColor={setCurrentColor} />
      <Button onClick={addText} variant="outline-secondary" size="sm" className="mb-2">Add Text</Button>
      <TemplatesToolbar importTemplate={importTemplate} exportTemplate={exportTemplate} />
      <UserManager />
    </div>
  );
};

export default Sidebar;
