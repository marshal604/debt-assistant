import React, { FunctionComponent } from 'react';
import { ModalFooterProps } from '../Modal.model';
const ModalFooter: FunctionComponent<ModalFooterProps> = props => (
  <div className="modal-footer d-flex align-items-center justify-content-end">
    {props.useCancel ? (
      <button
        type="button"
        className="btn btn-danger mr-3"
        data-dismiss="modal"
        onClick={() => {
          props.collapse(() => {
            if (props.cancel) {
              props.cancel();
            }
          });
        }}
      >
        {props.cancelText || 'Cancel'}
      </button>
    ) : null}
    <button
      type="button"
      className="btn btn-success"
      data-dismiss="modal"
      onClick={() => {
        props.collapse(() => {
          if (props.confirm) {
            props?.confirm();
          }
        });
      }}
    >
      {props.confirmText || 'Confirm'}
    </button>
  </div>
);

export default ModalFooter;
