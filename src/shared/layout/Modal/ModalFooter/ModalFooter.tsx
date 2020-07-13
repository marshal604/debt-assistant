import React, { FunctionComponent } from 'react';
import { ModalFooterProps } from '../Modal.model';
const ModalFooter: FunctionComponent<ModalFooterProps> = (props) => (
  <div className="modal-footer">
    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.collapse}>
      {props.children}
    </button>
  </div>
);

export default ModalFooter;
