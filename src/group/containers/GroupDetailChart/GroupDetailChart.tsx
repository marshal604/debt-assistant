import React, { Component } from 'react';

import * as chartjs from 'chart.js';
import { Doughnut, ChartData } from 'react-chartjs-2';
import { Link, RouteComponentProps } from 'react-router-dom';

import Page from 'src/shared/layout/Page/Page';
import { GroupDetailChartState } from './GroupDetailChart.model';
import GroupService from 'src/group/services/group/group.service';
import UserService from 'src/auth/services/user/user.service';

class GroupDetailChart extends Component<RouteComponentProps<{ id: string }>, GroupDetailChartState> {
  state = {
    debt: {},
    lend: {}
  };
  options = {
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(133, 33, 33, 0.6)',
      'rgba(133, 133, 33, 0.6)',
      'rgba(133, 133, 133, 0.6)'
    ],
    hoverBackgroundColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(133, 33, 33, 1)',
      'rgba(133, 133, 33, 1)',
      'rgba(133, 133, 133, 1)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(133, 33, 33, 1)',
      'rgba(133, 133, 33, 1)',
      'rgba(133, 133, 133, 1)'
    ],
    borderWidth: 1
  };
  groupId = this.props.match.params.id;
  componentDidMount() {
    const init =
      UserService.getGroupUsers().length !== 0
        ? Promise.resolve([])
        : GroupService.getGroup$(this.groupId).then(item => UserService.initGroupUsers$(item.stakeholders));
    init
      .then(() => Promise.all([this.getDebtChartData(this.groupId), this.getLendChartData(this.groupId)]))
      .then(([debt, lend]) => {
        this.setState({
          debt,
          lend
        });
      });
  }

  render() {
    return (
      <Page>
        <h4 className="d-flex align-items-center">
          <Link to={`/group/${this.groupId}`}>
            <i className="far fa-arrow-alt-circle-left"></i>
          </Link>
          <span className="ml-2">資產狀況</span>
        </h4>
        <div className="row">
          <div className="col-12 col-md-6">
            <h5>未付款</h5>
            <div>{this.state.debt ? <Doughnut data={this.state.debt}></Doughnut> : null}</div>
          </div>
          <div className="col-12 mt-4 mt-md-0 col-md-6">
            <h5>未收款</h5>
            <div>{this.state.lend ? <Doughnut data={this.state.lend}></Doughnut> : null}</div>
          </div>
        </div>
      </Page>
    );
  }

  getDebtChartData(groupId: string): Promise<ChartData<chartjs.ChartData>> {
    return GroupService.getGroupDebtItems$(UserService.getUserId(), groupId).then(items => {
      const hash = new Map<string, number>();
      items.forEach(item => {
        item.debtorIds.forEach(id => {
          let currency = item.currency / item.debtorIds.length;
          if (hash.has(id)) {
            currency += hash.get(id) || 0;
          }
          hash.set(id, currency);
        });
      });
      const data: number[] = [];
      const labels: string[] = [];
      hash.forEach((val, key) => {
        data.push(val);
        labels.push(UserService.getGroupUserName(key));
      });
      const id = 'debt_' + new Date().getTime();
      return {
        id,
        datasets: [{ data, ...this.options }],
        labels: labels
      } as ChartData<chartjs.ChartData>;
    });
  }

  getLendChartData(groupId: string): Promise<ChartData<chartjs.ChartData>> {
    return GroupService.getGroupLendItems$(UserService.getUserId(), groupId).then(items => {
      const hash = new Map<string, number>();
      items.forEach(item => {
        let currency = item.currency;
        if (hash.has(item.creditorId)) {
          currency += hash.get(item.creditorId) || 0;
        }
        hash.set(item.creditorId, currency);
      });
      const data: number[] = [];
      const labels: string[] = [];
      hash.forEach((val, key) => {
        data.push(val);
        labels.push(UserService.getGroupUserName(key));
      });
      const id = 'lend_' + new Date().getTime();
      return {
        id,
        datasets: [{ data, ...this.options }],
        labels: labels
      } as ChartData<chartjs.ChartData>;
    });
  }
}

export default GroupDetailChart;
