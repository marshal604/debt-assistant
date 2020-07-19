import React, { FunctionComponent } from 'react';

import { GroupOverviewProps } from './GroupOverview.model';
import GroupOverviewItem from './GroupOverviewItem/GroupOverviewItem';
const GroupOverview: FunctionComponent<GroupOverviewProps> = props => (
  <div className="row">
    <div className="mt-3 col-12 Group">
      <h4>群組概況</h4>
      <div className="row Group__Container">
        {props.items.map(item => (
          <div key={item.id} className="col-12 col-md-6 col-xl-4 Group__Container__Item">
            <GroupOverviewItem {...item}></GroupOverviewItem>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default GroupOverview;
