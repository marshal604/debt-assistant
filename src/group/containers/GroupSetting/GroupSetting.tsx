import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { withTranslation, WithTranslation } from 'react-i18next';

import { GroupSettingState } from './GroupSetting.model';
import Page from 'src/shared/layout/Page/Page';
import Card from 'src/shared/layout/Card/Card';
import { getDefaultGroupSettingForm, getStakeholders } from 'src/group/components/GroupSettingForm/GroupSettingForm.model';
import GroupSettingForm from 'src/group/components/GroupSettingForm/GroupSettingForm';
import { GroupRole } from 'src/group/model/Group.model';
import UserService from 'src/auth/services/user/user.service';
import GroupService from 'src/group/services/group/group.service';
import { InputType } from 'src/shared/forms/Input/Input.model';
class GroupSetting extends Component<RouteComponentProps<{ id: string }> & WithTranslation, GroupSettingState> {
  state = {
    groupId: '',
    form: getDefaultGroupSettingForm({
      id: UserService.getUserId(),
      name: UserService.getUserName(),
      role: GroupRole.Manager
    })
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      GroupService.getGroup$(id)
        .then(data => {
          return UserService.initGroupUsers$(data.stakeholders).then(() => data);
        })
        .then(data => {
          this.setState({
            groupId: id,
            form: {
              name: {
                inputType: InputType.Input,
                config: {
                  placeholder: this.props.t('Group.Field.PleaseTypingGroupName'),
                  type: 'text'
                },
                value: data.name,
                label: this.props.t('Group.Field.GroupName')
              },
              stakeholders: data.stakeholders.map(id =>
                getStakeholders(
                  true,
                  {
                    id,
                    name: UserService.getGroupUserName(id),
                    role: data.managers.includes(id) ? GroupRole.Manager : GroupRole.Member
                  },
                  true
                )
              )
            }
          });
        });
    }
  }

  render() {
    return (
      <Page central={true}>
        <h4>{this.state.groupId ? this.props.t('Group.Field.EditGroupData') : this.props.t('Group.Field.CreateGroupData')}</h4>
        <div className="w-100 mt-4"></div>
        <Card>
          <GroupSettingForm {...this.state.form} groupId={this.state.groupId}></GroupSettingForm>
        </Card>
      </Page>
    );
  }
}

export default withTranslation()(GroupSetting);
