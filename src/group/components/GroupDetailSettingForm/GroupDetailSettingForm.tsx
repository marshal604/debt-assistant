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
import LoadingContext from 'src/context/loading.context';

class GroupDetailSettingForm extends Component<GroupDetailSettingFormProps, GroupDetailSettingFormState> {
  state = {
    title: {
      inputType: InputType.Input,
      config: {
        placeholder: '請輸入債務名稱',
        type: 'text'
      },
      value: this.props.title || '',
      label: '名稱'
    },
    debtorId: {
      label: '債務人',
      options: UserService.getGroupUsers(),
      selected: this.props.debtorId || ''
    },
    creditorId: {
      label: '債權人',
      options: UserService.getGroupUsers(),
      selected: this.props.creditorId || ''
    },
    currency: {
      inputType: InputType.Input,
      config: {
        placeholder: '請輸入金額',
        type: 'number',
        onKeyDown: (event: KeyboardEvent) => {
          if (event.key === '-' || event.key === '+') {
            event.preventDefault();
          }
        },
        min: 0
      },
      value: this.props.currency || 0,
      label: '金額'
    },
    deadline: {
      inputType: InputType.Input,
      config: {
        placeholder: '',
        type: 'date'
      },
      value: this.props.deadline,
      label: '到期日'
    },
    submitted: false
  };

  static contextType = LoadingContext;
  context!: React.ContextType<typeof LoadingContext>;

  get isDisabledSubmit(): boolean {
    const isTitleEmpty = this.state.title.value === '';
    const isCurrencyZero = this.state.currency.value === 0;
    const isDebtorEmpty = this.state.debtorId.selected === '';
    const isCreditorEmpty = this.state.creditorId.selected === '';
    return this.props.disabled || isTitleEmpty || isCurrencyZero || isDebtorEmpty || isCreditorEmpty;
  }

  onTitleChange = (value: string) => {
    this.setState({
      title: { ...this.state.title, value }
    });
  };

  onDebtorChange = (item: OptionItem<string>) => {
    this.setState({
      debtorId: {
        ...this.state.debtorId,
        selected: item.id
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
      debtorId: this.state.debtorId.selected,
      creditorId: this.state.creditorId.selected,
      status: DebtStatus.Pending,
      createTime: new Date().toString(),
      deadlineTime: deadline.toString()
    };
    const action = this.props.groupDetailId
      ? GroupService.updateGroupDetail$(this.props.groupId, detail)
      : GroupService.createGroupDetail$(this.props.groupId, detail);
    action.then(() => {
      this.setState({
        submitted: true
      });
    });
  };

  onAddTemplate = (templateTitle: string) => {
    this.context.startLoading();
    GroupService.createGroupTemplate$(this.props.groupId, {
      id: '',
      detailTitle: this.state.title.value,
      templateTitle,
      debtorId: this.state.debtorId.selected,
      creditorId: this.state.creditorId.selected,
      currency: this.state.currency.value
    }).then(() => {
      this.context.finishLoading();
    });
  };

  render() {
    return (
      <ul className="row">
        {this.state.submitted ? <Redirect to={'/group/' + this.props.groupId} /> : null}
        <li className="col-12 text-right">
          <TextModal disabled={this.isDisabledSubmit} buttonName={'加入常用模板'} confirm={text => this.onAddTemplate(text)}></TextModal>
        </li>
        <li className="col-12">
          <Input {...this.state.title} change={value => this.onTitleChange(value)}></Input>
        </li>
        <li className="col-12">
          <div className="d-inline-flex">
            <Dropdown {...this.state.debtorId} change={value => this.onDebtorChange(value)}></Dropdown>
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
            送出
          </button>
        </li>
      </ul>
    );
  }
}

export default GroupDetailSettingForm;
