import React, { Component } from 'react';

import { GroupDetailPageState, DebtBehaviorStatus } from './GroupDetail.model';

import { OptionItem } from 'src/shared/forms/forms.model';
import Card from 'src/shared/layout/Card/Card';
import Dropdown from 'src/shared/forms/Dropdown/Dropdown';
import Page from 'src/shared/layout/Page/Page';
import './GroupDetail.scss';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';
import { GroupDetailItem, DebtStatus } from 'src/group/model/Group.model';
import GroupService from 'src/group/services/group/group.service';
import UserService from 'src/auth/services/user/user.service';

class GroupDetail extends Component<RouteComponentProps<{ id: string }>, GroupDetailPageState> {
  state = {
    items: [],
    redirectToEditPage: false,
    options: [
      {
        id: DebtBehaviorStatus.Edit,
        name: 'Edit'
      },
      {
        id: DebtBehaviorStatus.DunningNotice,
        name: 'Dunning Notice'
      }
    ]
  };
  selectedDetailId = '';
  groupId: string = '';
  componentDidMount() {
    const { id } = this.props.match.params;
    this.groupId = id;
    this.fetchDate();
  }

  componentDidUpdate() {
    const { id } = this.props.match.params;
    this.groupId = id;
  }

  render() {
    return (
      <Page>
        {this.state.redirectToEditPage ? <Redirect to={`/group/${this.groupId}/edit/${this.selectedDetailId}`} /> : null}
        <div className="GroupDetail">
          <div className="d-flex align-items-center justify-content-between">
            <h4>清單明細</h4>
            <div className="d-flex align-items-center">
              <Link to={`/group/${this.groupId}/create`} className="GroupDetail__Button">
                <div title="Create Detail" className="yur-float-button">
                  <i className="fas fa-plus"></i>
                </div>
              </Link>
              <Link to={`/group/${this.groupId}/batch`} className="GroupDetail__Button">
                <div title="Go to template list" className="ml-3 yur-float-button">
                  <i className="fas fa-clipboard-list"></i>
                </div>
              </Link>
            </div>
          </div>
          <div className="row GroupDetail__Content">
            {this.state.items.map((item: GroupDetailItem) => {
              return (
                <div key={item.id} className="col-12 col-md-6 col-xl-4 my-2">
                  <Card
                    classes={['GroupDetail__Content__Card GroupDetail__Content__Card--' + DebtStatus[item.status].toLowerCase()]}
                    header={
                      <div className="d-flex align-items-center justify-content-between">
                        <div> {item.title}</div>
                        <Dropdown options={this.getDynamicOption(item.status)} change={option => this.dropdownChange(option, item.id)}>
                          選擇行為
                        </Dropdown>
                      </div>
                    }
                  >
                    <div>
                      <ul
                        className={[
                          'GroupDetail__Content__List',
                          'GroupDetail__Content__List--' + DebtStatus[item.status].toLocaleLowerCase()
                        ].join(' ')}
                      >
                        <li className="row">
                          <div className="col-5 col-md-3">Debt:</div>
                          <div className="col-7 col-md-9"> {item.currency}</div>
                        </li>
                        <li className="row">
                          <div className="col-5 col-md-3">Debtors:</div>
                          <div className="col-7 col-md-9"> {item.debtorIds.map(id => this.getUserName(id)).join(', ')}</div>
                        </li>
                        <li className="row">
                          <div className="col-5 col-md-3">Creditor:</div>
                          <div className="col-7 col-md-9"> {this.getUserName(item.creditorId)}</div>
                        </li>
                        <li className="row">
                          <div className="col-5 col-md-3">Create:</div>
                          <div className="col-7 col-md-9"> {item.createTime}</div>
                        </li>
                        <li className="row">
                          <div className="col-5 col-md-3">Deadline:</div>
                          <div className="col-7 col-md-9"> {item.deadlineTime}</div>
                        </li>
                      </ul>
                      <div className={['GroupDetail__Content__Status', this.getStatusClass(item.status)].join(' ')}>
                        {this.getStatusName(item.status)}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </Page>
    );
  }

  fetchDate = () => {
    const { id } = this.props.match.params;
    let init = Promise.resolve();
    if (UserService.getGroupUsers()) {
      init = GroupService.getGroup$(id).then(item => {
        UserService.initGroupUsers$(item.stakeholders);
      });
    }
    init
      .then(() => GroupService.getGroupDetailList$(id))
      .then(data => {
        this.setState({
          items: data.map(item => ({
            id: item.id,
            title: item.title,
            currency: item.currency,
            debtorIds: item.debtorIds,
            creditorId: item.creditorId,
            status: item.status,
            createTime: new Date(item.createTime).toLocaleDateString().replace(/\//g, '-'),
            deadlineTime: new Date(item.deadlineTime).toLocaleDateString().replace(/\//g, '-')
          }))
        });
      });
  };

  dropdownChange(item: OptionItem<number>, detailId: string) {
    switch (item.id) {
      case DebtBehaviorStatus.Edit:
        this.selectedDetailId = detailId;
        this.setState({
          redirectToEditPage: true
        });
        break;
      case DebtBehaviorStatus.MarkPayOff:
        GroupService.updateGroupDetailStatus$(this.groupId, detailId, DebtStatus.PayOff).then(() => {
          this.fetchDate();
        });
        break;
      case DebtBehaviorStatus.MarkPending:
        GroupService.updateGroupDetailStatus$(this.groupId, detailId, DebtStatus.Pending).then(() => {
          this.fetchDate();
        });
        break;
    }
  }

  getUserName(id: string): string {
    return UserService.getGroupUsers().find(item => item.id === id)?.name || id;
  }

  getStatusName(status: DebtStatus): string {
    switch (status) {
      case DebtStatus.Pending:
        return 'Pending';
      case DebtStatus.PayOff:
        return 'Pay Off';
    }
  }

  getStatusClass(status: DebtStatus): string {
    switch (status) {
      case DebtStatus.Pending:
        return 'text-danger';
      case DebtStatus.PayOff:
        return 'text-success';
    }
  }

  getDynamicOption(status: DebtStatus): OptionItem<DebtBehaviorStatus>[] {
    if (DebtStatus.Pending === status) {
      return this.state.options.concat({
        id: DebtBehaviorStatus.MarkPayOff,
        name: 'Mark Pay Off'
      });
    } else {
      return this.state.options.concat({
        id: DebtBehaviorStatus.MarkPending,
        name: 'Mark Pending'
      });
    }
  }
}

export default GroupDetail;
