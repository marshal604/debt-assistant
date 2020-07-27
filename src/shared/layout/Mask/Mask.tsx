import React, { FunctionComponent } from 'react';

import './Mask.scss';
const Mask: FunctionComponent = props => (
  <div className="Mask h-100 mask fixed-top d-flex align-items-center justify-content-center">{props.children}</div>
);
export default Mask;
