import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import Card from 'src/shared/layout/Card/Card';
import { GroupOverviewProps } from './GroupOverview.model';
const GroupOverview: FunctionComponent<GroupOverviewProps> = props => {
  return (
    <Card
      classes={['Card--button']}
      body={
        <ul>
          <li className="d-flex align-items-center justify-content-between text-nowrap">
            <p className="col-md-3">名字</p>
            <p className="ml-md-2 font-weight-bold text-nowrap">{props.name}</p>
          </li>
          <li className="d-flex align-items-center justify-content-between text-nowrap mt-3">
            <p className="col-md-3">人數</p>
            <p className="ml-md-2 font-weight-bold text-nowrap">{props.stakeholders.length}</p>
          </li>
          <li className="d-flex align-items-center justify-content-between text-nowrap mt-3">
            <p className="col-md-3 text-nowrap">目前狀況</p>
            <p className="ml-md-2 font-weight-bold text-nowrap">{props.balance}</p>
          </li>
          <li className="d-flex align-items-center justify-content-end mt-3">
            <Link to={'/group/' + props.id}>
              <button type="button" className="btn btn-primary">
                進入群組
              </button>
            </Link>
          </li>
        </ul>
      }
    ></Card>
  );
};

export default GroupOverview;
