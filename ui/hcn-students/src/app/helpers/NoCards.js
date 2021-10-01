import React from "react";
import { Card } from "react-bootstrap";
import "./NoCards.css";

export function NoCards({ type }) {
  var style = type !== "Cursos" ? "20px" : "0px";

  return (
    <Card style={{ margin: style }} className="baseCard">
      <Card.Body>
        <div>
          <Card.Text>¡Sin {type} para mostrar!</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default NoCards;
