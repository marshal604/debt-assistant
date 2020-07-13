import React, { FunctionComponent } from 'react';
import { InputProps, InputType } from './Input.model';

const Input: FunctionComponent<InputProps> = (props) => (
  <div className="form-group">
    <label htmlFor={props.config.id}>{props.label}</label>
    {props.inputType === InputType.Input ? (
      <input className="form-control" {...props.config} />
    ) : (
      <textarea className="form-control" {...props.config}></textarea>
    )}
  </div>
);

export default Input;
