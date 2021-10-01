import { Button, Modal } from "react-bootstrap";
import React from "react";

export function ModalInfo({ show, handleClose, title, textInfo }) {
  title = title === undefined ? "Ayuda..." : title;
  return (
    <Modal show={show} onHide={handleClose} size="lg" animation={false}>
      <Modal.Header closeButton>
        <Modal.Title> {title} </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p4">
        <span>{textInfo}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button" onClick={() => handleClose()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
