import React, { FunctionComponent } from 'react';
import { ModalHeaderProps } from '../Modal.model';
const ModalHeader: FunctionComponent<ModalHeaderProps> = (props) => (
  <div className="modal-header">
    <h4 className="modal-title">{props.children}</h4>
    <button type="button" className="close" data-dismiss="modal" onClick={props.collapse}>
      &times;
    </button>
  </div>
);

export default ModalHeader;
