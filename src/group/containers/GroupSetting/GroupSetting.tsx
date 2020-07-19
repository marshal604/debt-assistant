import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GroupSettingState } from './GroupSetting.model';
import Page from 'src/shared/layout/Page/Page';
import Card from 'src/shared/layout/Card/Card';
import { getDefaultGroupSettingForm } from 'src/group/components/GroupSettingForm/GroupSettingForm.model';
import GroupSettingForm from 'src/group/components/GroupSettingForm/GroupSettingForm';
class GroupSetting extends Component<RouteComponentProps<{ id: string }>, GroupSettingState> {
  state = {
    groupId: '',
    form: getDefaultGroupSettingForm()
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({
      groupId: id
    });
  }

  render() {
    return (
      <Page central={true}>
        <h4>{this.state.groupId ? '修改' : '創建'}群組資料</h4>
        <div className="w-100 mt-4"></div>
        <Card body={<GroupSettingForm {...this.state.form}></GroupSettingForm>}></Card>
      </Page>
    );
  }
}

export default GroupSetting;
