import ColorPickerModal from './ColorPickerModal';
import TemplatesToolbar from './TemplatesToolbar';
import UserManager from './UserManager';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

const IconStar = () => (
  <svg
    width='16'
    height='16'
    fill='currentColor'
    className='bi bi-star-fill'
    viewBox='0 0 16 16'
  >
    <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696 2.157-4.507c.183-.384.73-.384.914 0l2.157 4.507 4.898.696c.441.062.612.636.283.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.388 2.256z' />
  </svg>
);

const IconCircle = () => (
  <svg
    width='16'
    height='16'
    fill='currentColor'
    className='bi bi-circle-fill'
    viewBox='0 0 16 16'
  >
    <circle cx='8' cy='8' r='8' />
  </svg>
);

const IconRectangle = () => (
  <svg
    width='16'
    height='16'
    fill='currentColor'
    className='bi bi-square-fill'
    viewBox='0 0 16 16'
  >
    <rect width='16' height='16' rx='2' />
  </svg>
);

const IconLeftArrow = () => (
  <svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
    <path
      fillRule='evenodd'
      d='M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z'
    />
  </svg>
);

const IconRightArrow = () => (
  <svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
    <path
      fillRule='evenodd'
      d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
    />
  </svg>
);

const Sidebar = ({
  selectedShape,
  setSelectedShape,
  addShape,
  handleUndo,
  handleRedo,
  addText,
  importTemplate,
  exportTemplate,
  currentColor,
  setCurrentColor,
  clearCanvas,
  onToggleCodeEditor,
  showCodeEditor,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        padding: '20px',
        background: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <DropdownButton
        id='shape-selector'
        title='Select Shape'
        onSelect={setSelectedShape}
        variant='outline-secondary'
        size='sm'
        className='mb-2'
      >
        <Dropdown.Item eventKey='Star'>
          <IconStar />{' '}
        </Dropdown.Item>
        <Dropdown.Item eventKey='Circle'>
          <IconCircle />{' '}
        </Dropdown.Item>
        <Dropdown.Item eventKey='Rect'>
          <IconRectangle />{' '}
        </Dropdown.Item>
        <Dropdown.Item eventKey='LeftArrow'>
          <IconLeftArrow />{' '}
        </Dropdown.Item>
        <Dropdown.Item eventKey='RightArrow'>
          <IconRightArrow />{' '}
        </Dropdown.Item>
      </DropdownButton>

      <Button
        onClick={addShape}
        variant='outline-secondary'
        size='sm'
        className='mb-2'
      >
        Add Shape
      </Button>
      <Button
        onClick={handleUndo}
        variant='outline-secondary'
        size='sm'
        className='mb-2'
      >
        Undo
      </Button>
      <Button
        onClick={handleRedo}
        variant='outline-secondary'
        size='sm'
        className='mb-2'
      >
        Redo
      </Button>
      <ColorPickerModal
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
      <Button
        onClick={addText}
        variant='outline-secondary'
        size='sm'
        className='mb-2'
      >
        Add Text
      </Button>
      <Button
        onClick={onToggleCodeEditor}
        variant='outline-secondary'
        size='sm'
        className='mb-2'
      >
        {showCodeEditor ? 'Hide Code Editor' : 'Show Code Editor'}
      </Button>
      <Button
        onClick={clearCanvas}
        variant='outline-danger'
        size='sm'
        className='mb-2'
        style={{ position: 'fixed', bottom: 0 }}
      >
        Clear CHAIS_Board
      </Button>

      <TemplatesToolbar
        importTemplate={importTemplate}
        exportTemplate={exportTemplate}
      />

      <UserManager />
    </div>
  );
};

export default Sidebar;
