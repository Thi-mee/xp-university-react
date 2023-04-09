import React from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function AccordionItem({eventKey, header, body}) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Button>{header}</Accordion.Button>
      {/* <Accordion.Header>{header}</Accordion.Header> */}
      <Accordion.Body>

        {body.map((item, index) => (
          <ListGroup.Item key={index}>
          <Link to={item.path}>{item.name}</Link>
          </ListGroup.Item>
        ))}

      </Accordion.Body>
    </Accordion.Item>
  );
}

export default AccordionItem;
