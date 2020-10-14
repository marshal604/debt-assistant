import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Toggle from 'src/shared/forms/Toggle/Toggle';
import { copyTextToClipboard } from 'src/shared/utils/text';
import { UserInfoProps } from './UserInfo.model';
import TextModal from 'src/shared/layout/TextModal/TextModal';

const UserInfo: FunctionComponent<UserInfoProps> = props => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <ul className="UserInfo">
        <li className="d-flex align-items-center justify-content-md-start justify-content-between">
          <p className="col-auto col-md-3">{t('General.Field.Id')}</p>
          <p className="ml-md-2 font-weight-bold">
            {props.id}
            <i
              title={t('User.Button.CopyId')}
              className="ml-2 fas fa-clipboard yur-cursor-point"
              onClick={() => copyTextToClipboard(props.id)}
            ></i>
          </p>
        </li>
        <li className="d-flex align-items-center justify-content-md-start justify-content-between mt-3">
          <p className="col-auto col-md-3">{t('General.Field.Name')}</p>
          <div className="ml-md-2 font-weight-bold">
            {props.name}
            {props.name ? (
              <span className="ml-2">
                <TextModal
                  title={t('User.Button.Rename')}
                  value={props.name}
                  buttonName={t('User.Button.Rename')}
                  confirm={text => (props.changeName ? props.changeName(text) : {})}
                ></TextModal>
              </span>
            ) : null}
          </div>
        </li>
        <li className="d-flex align-items-center justify-content-md-start justify-content-between mt-3">
          <p className="col-auto col-md-3">{t('General.Field.Lend')}</p>
          <p className="ml-md-2 font-weight-bold">
            {props.lend} {t('General.Field.Dollar')}
          </p>
        </li>
        <li className="d-flex align-items-center justify-content-md-start justify-content-between mt-3">
          <p className="col-auto col-md-3">{t('General.Field.Debt')}</p>
          <p className="ml-md-2 font-weight-bold">
            {props.debt} {t('General.Field.Dollar')}
          </p>
        </li>
        <li className="d-flex align-items-center justify-content-end mt-3">
          <p>{props.hasNotifyPermission ? t('User.Field.SubscribeNotify') : t('User.Field.UnsubscribeNotify')}</p>
          <Toggle
            className="ml-3 d-flex align-items-center"
            checked={props.hasNotifyPermission}
            change={checked => (props.permissionChange ? props.permissionChange(checked) : null)}
          ></Toggle>
        </li>
        <li className="d-flex align-items-center justify-content-end mt-3">
          {false ? (
            <button type="button" className="btn btn-primary">
              觀看訊息
            </button>
          ) : null}
          <Link className="ml-3" to="/group/create">
            <button type="button" className="btn btn-primary">
              {t('Group.Button.AddGroup')}
            </button>
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default UserInfo;
