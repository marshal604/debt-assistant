import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Page from 'src/shared/layout/Page/Page';
import Card from 'src/shared/layout/Card/Card';
import GroupService from 'src/group/services/group/group.service';
import UserService from 'src/auth/services/user/user.service';
import GroupDetailSettingForm from 'src/group/components/GroupDetailSettingForm/GroupDetailSettingForm';
import { GroupDetailSettingState } from './GroupDetailSetting.model';
import { GroupDetailItem, DebtStatus } from 'src/group/model/Group.model';
import LoadingContext from 'src/context/loading.context';
class GroupDetailSetting extends Component<RouteComponentProps<{ id: string; no: string }>, GroupDetailSettingState> {
  static contextType = LoadingContext;
  context!: React.ContextType<typeof LoadingContext>;
  state = {
    groupDetailId: this.props.match.params.no || '',
    data: this.getDefaultDetailSetting()
  };

  componentDidMount() {
    const { id: groupId } = this.props.match.params;
    this.context.startLoading();
    let init = Promise.resolve();
    if (!UserService.getGroupUsers()) {
      init = GroupService.getGroup$(groupId).then(item => {
        UserService.initGroupUsers$(item.stakeholders);
      });
    }
    init
      .then(() => {
        if (this.state.groupDetailId) {
          return GroupService.getGroupDetail$(groupId, this.state.groupDetailId).then(data => {
            return {
              ...data,
              deadlineTime: new Date(data.deadlineTime).toLocaleDateString().replace(/\//g, '-'),
              createTime: new Date(data.createTime).toLocaleDateString().replace(/\//g, '-')
            };
          });
        }
        return this.getDefaultDetailSetting();
      })
      .then(data => {
        this.setState({ data });
        this.context.finishLoading();
      });
  }

  render() {
    const { id: groupId } = this.props.match.params;

    return (
      <Page central={true}>
        <h4>{this.state.groupDetailId ? '修改' : '創建'}清單資料</h4>
        <div className="w-100 mt-4"></div>
        <Card>
          {this.context.loading ? null : (
            <GroupDetailSettingForm
              groupId={groupId}
              groupDetailId={this.state.groupDetailId}
              title={this.state.data.title}
              debtorId={this.state.data.debtorId}
              creditorId={this.state.data.creditorId}
              currency={this.state.data.currency}
              deadline={this.state.data.deadlineTime}
            />
          )}
        </Card>
      </Page>
    );
  }

  getDefaultDetailSetting(): GroupDetailItem {
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 31);
    return {
      id: '',
      title: '',
      currency: 0,
      debtorId: UserService.getUserId(),
      creditorId: UserService.getUserId(),
      status: DebtStatus.Pending,
      createTime: '',
      deadlineTime: deadlineDate.toLocaleDateString().replace(/\//g, '-')
    };
  }
}

export default GroupDetailSetting;
