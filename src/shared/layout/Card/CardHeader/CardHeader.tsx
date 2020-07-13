import React, { FunctionComponent } from 'react';

const CardHeader: FunctionComponent = (props) => (
  <div className="card-header">{props.children}</div>
);

export default CardHeader;
