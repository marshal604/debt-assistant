import React, { FunctionComponent } from 'react';
import { ToggleProps } from './Toggle.model';
import './Toggle.scss';

const Toggle: FunctionComponent<ToggleProps> = props => {
  return (
    <div className={[props.className, 'Toggle'].join(' ')}>
      <input
        className="Toggle__Input"
        checked={props.checked}
        disabled={props.disabled}
        onChange={event => (props.change ? props.change(event.target.checked) : null)}
        type="checkbox"
      />
    </div>
  );
};

export default Toggle;
