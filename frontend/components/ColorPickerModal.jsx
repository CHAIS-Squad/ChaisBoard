import React, { useState } from 'react';
import { CirclePicker, HuePicker } from 'react-color';
import { Modal, Button, Card } from 'react-bootstrap';

function ColorPickerModal({ currentColor, setCurrentColor }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Color Picker
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choose Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex justify-content-center">
          <Card style={{ width: 'auto' }}>
            <Card.Body>
              <div style={{ marginBottom: '20px' }}>
                <CirclePicker
                  color={currentColor}
                  onChangeComplete={(color) => {
                    setCurrentColor(color.hex);
                    handleClose();
                  }}
                />
              </div>
              <div style={{ marginTop: '20px' }}>
                <HuePicker
                  color={currentColor}
                  onChangeComplete={(color) => {
                    setCurrentColor(color.hex);
                  }}
                />
              </div>
            </Card.Body>
          </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ColorPickerModal;
