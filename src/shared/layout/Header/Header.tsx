import React, { FunctionComponent } from 'react';
import { HeaderProps } from './Header.model';
const Header: FunctionComponent<HeaderProps> = props => {
  return (
    <div className="text-right px-3">
      {props.showLogoutBtn ? (
        <button className="btn btn-outline-primary btn-sm" onClick={props.logout}>
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default Header;
