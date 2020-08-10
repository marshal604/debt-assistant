import React, { FunctionComponent } from 'react';
import { HeaderProps } from './Header.model';
import './Header.scss';
const Header: FunctionComponent<HeaderProps> = props => {
  return (
    <div className="Header d-flex justify-content-between px-3 py-1">
      <div className="Header__Left">{props.left}</div>
      <div className="Header__Center">{props.center}</div>
      <div className="Header__Right">{props.right}</div>
    </div>
  );
};

export default Header;
