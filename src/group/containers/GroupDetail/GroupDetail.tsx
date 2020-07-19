import React, { Component } from 'react';

import { GroupDetailPageState, DebtItem, DebtStatus } from './GroupDetail.model';
import { OptionItem } from 'src/shared/forms/forms.model';
import Card from 'src/shared/layout/Card/Card';
import Dropdown from 'src/shared/forms/Dropdown/Dropdown';
import Page from 'src/shared/layout/Page/Page';
import './GroupDetail.scss';
class GroupDetail extends Component<{}, GroupDetailPageState> {
  state = {
    items: [],
    options: [
      { id: 1, name: 'Dunning Notice' },
      { id: 2, name: 'Mark Pay Off' }
    ]
  };

  componentDidMount() {
    this.fetchDate();
  }

  render() {
    return (
      <Page>
        <div className="row GroupDetail">
          {this.state.items.map((item: DebtItem) => {
            return (
              <div className="col-12 col-md-6 col-xl-4 my-2">
                <Card
                  key={item.id}
                  header={
                    <div className="d-flex align-items-center justify-content-between">
                      <div>{item.title}</div>
                      <Dropdown options={this.state.options} change={this.dropdownChange}>
                        選擇行為
                      </Dropdown>
                    </div>
                  }
                  body={
                    <div>
                      <ul>
                        <li>Status: {item.status}</li>
                        <li>Debt: {item.currency}</li>
                        <li>Debtor: {item.debtorId}</li>
                        <li>Creditor: {item.creditorId}</li>
                      </ul>
                    </div>
                  }
                ></Card>
              </div>
            );
          })}
        </div>
      </Page>
    );
  }

  fetchDate = () => {
    setTimeout(() => {
      this.setState({
        items: [1, 2, 3, 4, 5, 6, 7].map(item => ({
          id: `test${item}`,
          title: `test${item}`,
          groupId: `test${item}`,
          creditorId: `creditor${item}`,
          debtorId: `debtor${item}`,
          status: DebtStatus.Pending,
          currency: item * 1000
        }))
      });
    }, 1000);
  };

  dropdownChange(item: OptionItem<number>) {
    console.log(item);
  }
}

export default GroupDetail;
