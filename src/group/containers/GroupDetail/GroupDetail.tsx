import React, { Component } from 'react';

import { GroupDetailPageState } from './GroupDetail.model';

import Card from 'src/shared/layout/Card/Card';
import Page from 'src/shared/layout/Page/Page';
import './GroupDetail.scss';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';
import { GroupDetailItem, DebtStatus } from 'src/group/model/Group.model';
import GroupService from 'src/group/services/group/group.service';
import UserService from 'src/auth/services/user/user.service';
import notificationService from 'src/helper/notification/notification.service';
import Firebase from 'src/shared/utils/firebase-register';

class GroupDetail extends Component<RouteComponentProps<{ id: string }>, GroupDetailPageState> {
  state = {
    items: [],
    redirectToEditPage: false
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
              <Link to={`/group/${this.groupId}/chart`} className="GroupDetail__Button">
                <div title="Go to template list" className="ml-3 yur-float-button">
                  <i className="fas fa-chart-pie"></i>
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
                        <div className="GroupDetail__Content__Title"> {item.title}</div>
                        <div className="d-flex align-items-center">
                          <i className="fas fa-edit yur-cursor-point" onClick={() => this.editDetail(item.id)}></i>
                          <i className="ml-3 fas fa-bell yur-cursor-point" onClick={() => this.notifyUsers(item)}></i>
                        </div>
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
                      <div
                        className="GroupDetail__Content__Status yur-cursor-point"
                        onClick={() => this.markStatus(item.id, this.getReverseStatus(item.status))}
                      >
                        <div className="GroupDetail__Content__Status__Text">{this.getStatusName(item.status)}</div>
                        <div className="GroupDetail__Content__Status__HoverText">{this.getReverseStatusName(item.status)}</div>
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
    const init =
      UserService.getGroupUsers().length !== 0
        ? Promise.resolve([])
        : GroupService.getGroup$(id).then(item => UserService.initGroupUsers$(item.stakeholders));

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

  editDetail(detailId: string) {
    this.selectedDetailId = detailId;
    this.setState({
      redirectToEditPage: true
    });
  }

  notifyUsers(item: GroupDetailItem) {
    Promise.all(item.debtorIds.map(id => notificationService.getDeviceTokensByUser$(id))).then(data => {
      const tokens = data.reduce((cur, pre) => pre.concat(cur), []);
      return Firebase.multiNotify({
        tokens: tokens,
        title: '請儘速繳款',
        message: `${item.title}`,
        link: `https://marshal604.github.io/debt-assistant/#/group/${this.groupId}`
      });
    });
  }

  markStatus(detailId: string, status: DebtStatus) {
    GroupService.updateGroupDetailStatus$(this.groupId, detailId, status).then(() => {
      this.fetchDate();
    });
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

  getReverseStatus(status: DebtStatus): DebtStatus {
    switch (status) {
      case DebtStatus.Pending:
        return DebtStatus.PayOff;
      case DebtStatus.PayOff:
        return DebtStatus.Pending;
    }
  }

  getReverseStatusName(status: DebtStatus): string {
    switch (status) {
      case DebtStatus.Pending:
        return 'Pay Off';
      case DebtStatus.PayOff:
        return 'Pending';
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
}

export default GroupDetail;
