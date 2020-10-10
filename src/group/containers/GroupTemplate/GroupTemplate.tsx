import React, { Component } from 'react';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';

import Page from 'src/shared/layout/Page/Page';
import Card from 'src/shared/layout/Card/Card';
import UserService from 'src/auth/services/user/user.service';
import Input from 'src/shared/forms/Input/Input';
import { GroupTemplateState, GroupTemplateFormItem } from './GroupTemplate.model';
import GroupService from 'src/group/services/group/group.service';
import { InputType } from 'src/shared/forms/Input/Input.model';
import { GroupTemplateItem, GroupDetailItem, DebtStatus } from 'src/group/model/Group.model';
class GroupTemplate extends Component<RouteComponentProps<{ id: string }>, GroupTemplateState> {
  state = {
    redirectToGroup: false,
    items: [] as GroupTemplateFormItem[],
    selectedIds: [] as string[]
  };

  groupId = '';

  componentDidMount() {
    const { id: groupId } = this.props.match.params;
    this.groupId = groupId;
    this.fetchData();
  }

  onDetailTitleChange(template: GroupTemplateItem, value: string) {
    if (!this.isSelected(template.id)) {
      return;
    }
    const matchItem = this.state.items.find(item => item.id === template.id);
    if (!matchItem) {
      return;
    }
    matchItem.detailTitle.value = value;
    this.setState({
      items: this.state.items.slice()
    });
  }

  onCurrencyChange(template: GroupTemplateItem, value: number) {
    if (!this.isSelected(template.id)) {
      return;
    }
    const matchItem = this.state.items.find(item => item.id === template.id);
    if (!matchItem) {
      return;
    }
    matchItem.currency.value = value;
    this.setState({
      items: this.state.items.slice()
    });
  }

  onDetailSelectionChange(template: GroupTemplateItem, value: boolean) {
    const matchItem = this.state.items.find(item => template.id === item.id);
    if (matchItem) {
      matchItem.detailTitle.config.disabled = !value;
      matchItem.currency.config.disabled = !value;
    }
    this.setState({
      selectedIds: value ? this.state.selectedIds.concat(template.id) : this.state.selectedIds.filter(id => id !== template.id),
      items: this.state.items.slice()
    });
  }

  isSelected(id: string): boolean {
    return this.state.selectedIds.includes(id);
  }

  batchCreate() {
    GroupService.batchCreateGroupDetail$(this.groupId, this.getSelectedDetailItems()).then(() => {
      this.setState({
        redirectToGroup: true
      });
    });
  }

  batchDelete() {
    GroupService.batchDeleteGroupTemplate$(this.groupId, this.state.selectedIds).then(() => {
      this.fetchData();
    });
  }

  fetchData() {
    const init =
      UserService.getGroupUsers().length !== 0
        ? Promise.resolve([])
        : GroupService.getGroup$(this.groupId).then(item => UserService.initGroupUsers$(item.stakeholders));

    init
      .then(() => GroupService.getGroupTemplate$(this.groupId))
      .then(data => {
        this.setState({
          items: data.map(item => ({
            id: item.id,
            templateTitle: item.templateTitle,
            creditorId: item.creditorId,
            debtorIds: item.debtorIds,
            detailTitle: {
              inputType: InputType.Input,
              config: {
                placeholder: '請輸入清單名稱',
                type: 'text',
                disabled: true
              },
              value: item.detailTitle,
              label: '清單名稱',
              change: (value: string) => this.onDetailTitleChange(item, value)
            },
            currency: {
              inputType: InputType.Input,
              config: {
                placeholder: '請輸入帳務金額',
                type: 'number',
                min: 0,
                disabled: true
              },
              value: item.currency,
              label: '金額',
              change: (value: number) => this.onCurrencyChange(item, value)
            },
            checkbox: {
              inputType: InputType.Input,
              config: {
                type: 'checkbox',
                placeholder: ''
              },
              value: false,
              change: value => this.onDetailSelectionChange(item, value)
            }
          }))
        });
      });
  }

  getSelectedDetailItems(): GroupDetailItem[] {
    const now = new Date().toString();
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 30);
    deadline.setHours(23);
    deadline.setMinutes(59);
    return this.state.items
      .filter(item => this.state.selectedIds.includes(item.id))
      .map(item => ({
        id: '',
        title: item.detailTitle.value,
        currency: item.currency.value,
        debtorIds: item.debtorIds,
        creditorId: item.creditorId,
        status: DebtStatus.Pending,
        createTime: now,
        deadlineTime: deadline.toString()
      }));
  }

  render() {
    return (
      <Page>
        {this.state.redirectToGroup ? <Redirect to={`/group/${this.groupId}`} /> : null}
        <div className="GroupTemplate">
          <div className="d-flex align-items-center justify-content-between">
            <h4>
              <Link to={`/group/${this.groupId}`}>
                <i className="far fa-arrow-alt-circle-left"></i>
              </Link>
              <span className="ml-2">模板清單</span>
            </h4>
            {this.state.selectedIds.length > 0 ? (
              <div className="d-flex align-items-center">
                <div title="Batch Create Detail" className="yur-float-button" onClick={() => this.batchCreate()}>
                  <i className="fas fa-plus"></i>
                </div>
                <div title="Batch Delete Template" className="ml-3 yur-float-button" onClick={() => this.batchDelete()}>
                  <i className="fas fa-trash"></i>
                </div>
              </div>
            ) : null}
          </div>
          <div className="row GroupTemplate__Content">
            {this.state.items.map((item: GroupTemplateFormItem) => {
              return (
                <div key={item.id} className="col-12 col-md-6 col-xl-4 my-2">
                  <Card
                    classes={['GroupTemplate__Content__Card']}
                    header={
                      <div className="d-flex align-items-center justify-content-between">
                        <div> {item.templateTitle}</div>
                        <Input {...item.checkbox}></Input>
                      </div>
                    }
                  >
                    <div>
                      <ul className={'GroupTemplate__Content__List'}>
                        <li className="row">
                          <div className="col-12">
                            <Input {...item.detailTitle}></Input>
                          </div>
                        </li>
                        <li className="row">
                          <div className="col-12">
                            <Input {...item.currency}></Input>
                          </div>
                        </li>
                        <li className="row">
                          <div className="col-5 col-md-3">Debtors:</div>
                          <div className="col-7 col-md-9"> {item?.debtorIds?.map(id => this.getUserName(id)).join(', ')}</div>
                        </li>
                        <li className="row">
                          <div className="col-5 col-md-3">Creditor:</div>
                          <div className="col-7 col-md-9"> {this.getUserName(item.creditorId)}</div>
                        </li>
                      </ul>
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

  getUserName(id: string): string {
    return UserService.getGroupUsers().find(item => item.id === id)?.name || id;
  }
}

export default GroupTemplate;
