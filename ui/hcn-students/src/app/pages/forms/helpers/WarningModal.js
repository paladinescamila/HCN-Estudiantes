import React from "react";
import { Modal, Button } from "react-bootstrap";

export function WarningModal({ handleClose, show, warnings }) {
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>¡Recuerda!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Tu actividad fue guardada, pero los siguientes campos están vacíos: </span>
        <div style={{ padding: "15px" }}>
          {Object.values(warnings).map((item, _index) => {
            return <li key={item}> {item} </li>;
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" className="buttonModal" onClick={() => handleClose()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
