import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { UserInfoProps } from './UserInfo.model';

const UserInfo: FunctionComponent<UserInfoProps> = props => (
  <React.Fragment>
    <ul className="UserInfo">
      <li className="d-flex align-items-center justify-content-md-start justify-content-between">
        <p className="col-md-3">ID</p>
        <p className="ml-md-2 font-weight-bold text-nowrap">{props.id}</p>
      </li>
      <li className="d-flex align-items-center justify-content-md-start justify-content-between mt-3">
        <p className="col-md-3">名字</p>
        <p className="ml-md-2 font-weight-bold text-nowrap">{props.name}</p>
      </li>
      <li className="d-flex align-items-center justify-content-md-start justify-content-between mt-3">
        <p className="col-md-3">目前狀態</p>
        <p className="ml-md-2 font-weight-bold text-nowrap">{props.debtStatus} TWD</p>
      </li>
      <li className="d-flex align-items-center justify-content-end mt-3">
        <button type="button" className="btn btn-primary">
          觀看訊息
        </button>
        <Link to="/group/create">
          <button type="button" className="btn btn-primary ml-3">
            新增群組
          </button>
        </Link>
      </li>
    </ul>
  </React.Fragment>
);

export default UserInfo;
