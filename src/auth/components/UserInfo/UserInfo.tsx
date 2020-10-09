import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'src/shared/forms/Toggle/Toggle';
import { copyTextToClipboard } from 'src/shared/utils/text';
import { UserInfoProps } from './UserInfo.model';

const UserInfo: FunctionComponent<UserInfoProps> = props => (
  <React.Fragment>
    <ul className="UserInfo">
      <li className="d-flex align-items-center justify-content-md-start justify-content-between">
        <p className="col-md-3">ID</p>
        <p className="ml-md-2 font-weight-bold text-nowrap">
          {props.id}
          <i title="copy" className="ml-2 fas fa-clipboard" onClick={() => copyTextToClipboard(props.id)}></i>
        </p>
      </li>
      <li className="d-flex align-items-center justify-content-md-start justify-content-between mt-3">
        <p className="col-md-3">名字</p>
        <p className="ml-md-2 font-weight-bold text-nowrap">{props.name}</p>
      </li>
      <li className="d-flex align-items-center justify-content-md-start justify-content-between mt-3">
        <p className="col-md-3">借出</p>
        <p className="ml-md-2 font-weight-bold text-nowrap">{props.lend} TWD</p>
      </li>
      <li className="d-flex align-items-center justify-content-md-start justify-content-between mt-3">
        <p className="col-md-3">負債</p>
        <p className="ml-md-2 font-weight-bold text-nowrap">{props.debt} TWD</p>
      </li>
      <li className="d-flex align-items-center justify-content-end mt-3">
        <p>{props.hasNotifyPermission ? '訂閱推播中' : '目前未啟用推播功能'}</p>
        <Toggle
          className="ml-3 d-flex align-items-center"
          checked={props.hasNotifyPermission}
          change={checked => (props.permissionChange ? props.permissionChange(checked) : null)}
        ></Toggle>
      </li>
      <li className="d-flex align-items-center justify-content-end mt-3">
        <button type="button" className="btn btn-primary">
          觀看訊息
        </button>
        <Link className="ml-3" to="/group/create">
          <button type="button" className="btn btn-primary">
            新增群組
          </button>
        </Link>
      </li>
    </ul>
  </React.Fragment>
);

export default UserInfo;
