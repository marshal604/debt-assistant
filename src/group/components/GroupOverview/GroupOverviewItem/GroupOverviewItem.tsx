import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import Card from 'src/shared/layout/Card/Card';
import { GroupOverviewItemProps } from './GroupOverviewItem.model';
import { useTranslation } from 'react-i18next';
const GroupOverviewItem: FunctionComponent<GroupOverviewItemProps> = props => {
  const { t } = useTranslation();
  return (
    <Card classes={['Card--button']}>
      <ul>
        <li className="d-flex align-items-center justify-content-between text-nowrap">
          <p className="col-md-3">{t('General.Field.Name')}</p>
          <p className="ml-md-2 font-weight-bold text-nowrap">{props.name}</p>
        </li>
        <li className="d-flex align-items-center justify-content-between text-nowrap mt-3">
          <p className="col-md-3">{t('User.Field.PeopleAmount')}</p>
          <p className="ml-md-2 font-weight-bold text-nowrap">{props.stakeholders.length}</p>
        </li>
        <li className="d-flex align-items-center justify-content-between text-nowrap mt-3">
          <p className="col-md-3 text-nowrap">{t('General.Field.Lend')}</p>
          <p className="ml-md-2 font-weight-bold text-nowrap">
            {props.lend} {t('General.Field.Dollar')}
          </p>
        </li>
        <li className="d-flex align-items-center justify-content-between text-nowrap mt-3">
          <p className="col-md-3 text-nowrap">{t('General.Field.Debt')}</p>
          <p className="ml-md-2 font-weight-bold text-nowrap">
            {props.debt} {t('General.Field.Dollar')}
          </p>
        </li>
        <li className="d-flex align-items-center justify-content-end mt-3">
          <Link to={'/group/edit/' + props.id}>
            <button type="button" className="btn btn-primary">
              {t('Group.Button.ManageGroup')}
            </button>
          </Link>
          <Link className="ml-2" to={'/group/' + props.id}>
            <button type="button" className="btn btn-primary">
              {t('Group.Button.GoToGroup')}
            </button>
          </Link>
        </li>
      </ul>
    </Card>
  );
};

export default GroupOverviewItem;
