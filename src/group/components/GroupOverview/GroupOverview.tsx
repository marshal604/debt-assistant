import React, { FunctionComponent } from 'react';

import { useTranslation } from 'react-i18next';

import { GroupOverviewProps } from './GroupOverview.model';
import GroupOverviewItem from './GroupOverviewItem/GroupOverviewItem';
import Card from 'src/shared/layout/Card/Card';
import './GroupOverview.scss';
const GroupOverview: FunctionComponent<GroupOverviewProps> = props => {
  const { t } = useTranslation();
  return (
    <div className="row">
      <div className="mt-3 col-12 Group">
        <h4>{t('User.Field.GroupOverview')}</h4>
        <div className="row Group__Container">
          {props.items.length > 0 ? (
            props.items.map(item => (
              <div key={item.id} className="col-12 col-md-6 col-xl-4 Group__Container__Item">
                <GroupOverviewItem {...item}></GroupOverviewItem>
              </div>
            ))
          ) : (
            <div className="col-12 Group__Container__Item">
              <Card classes={['text-center']}>{t('User.Message.EmptyGroup')}</Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupOverview;
