import { Modal, Button, Image } from "react-bootstrap";
import "./ModalImageHelp.css";

export function DisplayMediaModal({ handleClose, show, information, title, type }) {
  type = type === undefined ? "image" : type;
  return (
    <Modal show={show} onHide={handleClose} size="lg" animation={false}>
      <Modal.Header closeButton>
        <Modal.Title> {title} </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">{type === "image" ? <Image src={information} fluid /> : null}</Modal.Body>
      <Modal.Footer>
        <Button className="button" onClick={() => handleClose()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
