import React, { FunctionComponent } from 'react';

const CardFooter: FunctionComponent = (props) => (
  <div className="card-footer">{props.children}</div>
);

export default CardFooter;
