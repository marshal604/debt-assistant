import React, { FunctionComponent } from "react";
import CardHeader from "./CardHeader/CardHeader";
import CardBody from "./CardBody/CardBody";
import CardFooter from "./CardFooter/CardFooter";
import { CardProps } from "./Card.model";
const Card: FunctionComponent<CardProps> = props => (
  <div className="card">
    {props.header ? <CardHeader>{props.header}</CardHeader> : null}
    <CardBody>{props.body}</CardBody>
    {props.footer ? <CardFooter>{props.footer}</CardFooter> : null}
  </div>
);

export default Card;
