import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GroupSettingState } from './GroupSetting.model';
import Page from 'src/shared/layout/Page/Page';
import Card from 'src/shared/layout/Card/Card';
import { getDefaultGroupSettingForm, getStakeholders } from 'src/group/components/GroupSettingForm/GroupSettingForm.model';
import GroupSettingForm from 'src/group/components/GroupSettingForm/GroupSettingForm';
import { GroupRole } from 'src/group/model/Group.model';
import UserService from 'src/auth/services/user/user.service';
import GroupService from 'src/group/services/group/group.service';
import { InputType } from 'src/shared/forms/Input/Input.model';
class GroupSetting extends Component<RouteComponentProps<{ id: string }>, GroupSettingState> {
  state = {
    groupId: '',
    form: getDefaultGroupSettingForm({
      id: UserService.getUserId(),
      role: GroupRole.Manager
    })
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      GroupService.getGroup$(id).then(data => {
        this.setState({
          groupId: id,
          form: {
            name: {
              inputType: InputType.Input,
              config: {
                placeholder: '請輸入群組名稱',
                type: 'text'
              },
              value: data.name,
              label: '名稱'
            },
            stakeholders: data.stakeholders.map(id =>
              getStakeholders(true, {
                id,
                role: data.managers.includes(id) ? GroupRole.Manager : GroupRole.Member
              })
            )
          }
        });
      });
    }
  }

  render() {
    return (
      <Page central={true}>
        <h4>{this.state.groupId ? '修改' : '創建'}群組資料</h4>
        <div className="w-100 mt-4"></div>
        <Card>
          <GroupSettingForm {...this.state.form} groupId={this.state.groupId}></GroupSettingForm>
        </Card>
      </Page>
    );
  }
}

export default GroupSetting;
