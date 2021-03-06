import React, { Component } from 'react';

import Input from 'src/shared/forms/Input/Input';
import Dropdown from 'src/shared/forms/Dropdown/Dropdown';
import { GroupDetailSettingFormProps, GroupDetailSettingFormState } from './GroupDetailSettingForm.model';
import { OptionItem } from 'src/shared/forms/forms.model';
import { Redirect } from 'react-router-dom';
import { InputType } from 'src/shared/forms/Input/Input.model';
import UserService from 'src/auth/services/user/user.service';
import GroupService from 'src/group/services/group/group.service';
import { DebtStatus } from 'src/group/model/Group.model';
import TextModal from 'src/shared/layout/TextModal/TextModal';
import Firebase from 'src/shared/utils/firebase-register';
import NotificationService from 'src/helper/notification/notification.service';
import MultiSelect from 'src/shared/forms/MultiSelect/MultiSelect';
import { withTranslation } from 'react-i18next';
class GroupDetailSettingForm extends Component<GroupDetailSettingFormProps, GroupDetailSettingFormState> {
  state = {
    groupDetailId: this.props.groupDetailId,
    title: {
      inputType: InputType.Input,
      config: {
        placeholder: this.props.t('Group.Field.PleaseTypingDetailName'),
        type: 'text'
      },
      value: this.props.title || '',
      label: this.props.t('Group.Field.DetailName')
    },
    debtorIds: {
      label: this.props.t('Group.Field.Debtor'),
      options: UserService.getGroupUsers(),
      selected: this.props.debtorIds || ([] as string[])
    },
    creditorId: {
      label: this.props.t('Group.Field.Creditor'),
      options: UserService.getGroupUsers(),
      selected: this.props.creditorId || ''
    },
    currency: {
      inputType: InputType.Input,
      config: {
        placeholder: this.props.t('Group.Field.PleaseTypingCurrency'),
        type: 'number',
        onKeyDown: (event: KeyboardEvent) => {
          if (event.key === '-' || event.key === '+') {
            event.preventDefault();
          }
        },
        min: 0
      },
      value: this.props.currency || 0,
      label: this.props.t('Group.Field.Currency')
    },
    deadline: {
      inputType: InputType.Input,
      config: {
        placeholder: '',
        type: 'date'
      },
      value: this.props.deadline,
      label: this.props.t('Group.Field.Deadline')
    },
    submitted: false
  };

  componentDidMount() {
    GroupService.getGroup$(this.props.groupId)
      .then(item => UserService.initGroupUsers$(item.stakeholders))
      .then(() => {
        this.setState({
          ...this.state,
          debtorIds: {
            ...this.state.debtorIds,
            options: UserService.getGroupUsers()
          },
          creditorId: {
            ...this.state.creditorId,
            options: UserService.getGroupUsers()
          }
        });
      });
  }

  get isDisabledSubmit(): boolean {
    const isTitleEmpty = this.state.title.value === '';
    const isCurrencyZero = this.state.currency.value === 0;
    const isDebtorEmpty = this.state.debtorIds.selected.length === 0;
    const isCreditorEmpty = this.state.creditorId.selected === '';
    return this.props.disabled || isTitleEmpty || isCurrencyZero || isDebtorEmpty || isCreditorEmpty;
  }

  onTitleChange = (value: string) => {
    this.setState({
      title: { ...this.state.title, value }
    });
  };

  onDebtorChange = (selected: string[]) => {
    this.setState({
      debtorIds: {
        ...this.state.debtorIds,
        selected: selected
      }
    });
  };

  onCreditorChange = (item: OptionItem<string>) => {
    this.setState({
      creditorId: {
        ...this.state.creditorId,
        selected: item.id
      }
    });
  };

  onCurrencyChange = (value: number) => {
    this.setState({
      currency: { ...this.state.currency, value }
    });
  };

  onDeadlineChange = (value: string) => {
    this.setState({
      deadline: { ...this.state.deadline, value }
    });
  };

  onSubmit = () => {
    const deadline = new Date(this.state.deadline.value);
    deadline.setHours(23);
    deadline.setMinutes(59);
    const detail = {
      id: this.props.groupDetailId || '',
      title: this.state.title.value,
      currency: this.state.currency.value,
      debtorIds: this.state.debtorIds.selected,
      creditorId: this.state.creditorId.selected,
      status: DebtStatus.Pending,
      createTime: new Date().toString(),
      deadlineTime: deadline.toString()
    };
    const action = this.props.groupDetailId
      ? GroupService.updateGroupDetail$(this.props.groupId, detail)
      : GroupService.createGroupDetail$(this.props.groupId, detail);
    action
      .then(() => Promise.all(this.state.debtorIds.selected.map(id => NotificationService.getDeviceTokensByUser$(id))))
      .then(data => {
        this.setState({
          submitted: true
        });
        const tokens = data.reduce((cur, pre) => pre.concat(cur), []);
        return Firebase.multiNotify({
          tokens: tokens,
          title: this.props.t('Group.Message.DebtNotify'),
          message: `${this.state.title.value}`,
          link: `https://marshal604.github.io/debt-assistant/#/group/${this.props.groupId}`
        });
      });
  };

  onAddTemplate = (templateTitle: string) => {
    GroupService.createGroupTemplate$(this.props.groupId, {
      id: '',
      detailTitle: this.state.title.value,
      templateTitle,
      debtorIds: this.state.debtorIds.selected,
      creditorId: this.state.creditorId.selected,
      currency: this.state.currency.value
    });
  };

  render() {
    return (
      <ul className="row">
        {this.state.submitted ? <Redirect to={'/group/' + this.props.groupId} /> : null}
        <li className="col-12 text-right">
          <TextModal
            disabled={this.isDisabledSubmit}
            buttonName={this.props.t('Group.Button.AddToTemplate')}
            confirm={text => this.onAddTemplate(text)}
          ></TextModal>
        </li>
        <li className="col-12">
          <Input {...this.state.title} change={value => this.onTitleChange(value)}></Input>
        </li>
        <li className="col-12">
          <div className="d-inline-flex">
            <MultiSelect {...this.state.debtorIds} change={value => this.onDebtorChange(value)}></MultiSelect>
          </div>
        </li>
        <li className="col-12 mt-3">
          <div className="d-inline-flex">
            <Dropdown {...this.state.creditorId} change={value => this.onCreditorChange(value)}></Dropdown>
          </div>
        </li>
        <li className="col-12  mt-3">
          <Input {...this.state.currency} change={value => this.onCurrencyChange(value)}></Input>
        </li>
        <li className="col-12">
          <Input {...this.state.deadline} change={value => this.onDeadlineChange(value)}></Input>
        </li>
        <li className="col-12 text-right mt-3">
          <button disabled={this.isDisabledSubmit} type="button" className="btn btn-primary" onClick={this.onSubmit}>
            {this.props.t('General.Button.Submit')}
          </button>
        </li>
      </ul>
    );
  }
}

export default withTranslation()(GroupDetailSettingForm);
