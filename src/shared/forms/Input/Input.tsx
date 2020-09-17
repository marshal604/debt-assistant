import React, { FunctionComponent } from 'react';
import { InputProps, InputType } from './Input.model';

const Input: FunctionComponent<InputProps<any>> = props => {
  const onInput = (value: any) => {
    if (props.change) {
      props.change(value);
    }
  };

  return (
    <div className="form-group">
      {props.label ? <label htmlFor={props.config.id}>{props.label}</label> : null}
      {props.inputType === InputType.Input ? (
        <input
          className="form-control"
          {...props.config}
          defaultValue={props.value}
          onInput={$event => onInput(($event.target as HTMLInputElement).value)}
        />
      ) : (
        <textarea
          className="form-control"
          {...props.config}
          defaultValue={props.value}
          onInput={$event => onInput(($event.target as HTMLInputElement).value)}
        ></textarea>
      )}
    </div>
  );
};

export default Input;