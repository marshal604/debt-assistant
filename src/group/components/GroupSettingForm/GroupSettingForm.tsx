import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';

import Input from 'src/shared/forms/Input/Input';
import Dropdown from 'src/shared/forms/Dropdown/Dropdown';
import {
  GroupSettingFormProps,
  getStakeholders,
  GroupSettingStakeholders,
  GroupSettingFormState,
  GroupSettingData,
  UserIdCheckStatus
} from './GroupSettingForm.model';
import { OptionItem } from 'src/shared/forms/forms.model';
import { Redirect } from 'react-router-dom';
import GroupService from 'src/group/services/group/group.service';
import { GroupRole } from 'src/group/model/Group.model';
import './GroupSettingForm.scss';
import UserService from 'src/auth/services/user/user.service';

class GroupSettingForm extends Component<GroupSettingFormProps, GroupSettingFormState> {
  state = {
    groupId: this.props.groupId,
    name: this.props.name,
    stakeholders: this.props.stakeholders,
    submitted: false,
    userIdCheckStatus: UserIdCheckStatus.Checking,
    nowCheckUserId: undefined
  };

  get isDisabledSubmit(): boolean {
    const isNameEmpty = this.state.name.value === '';
    const isAnyStakeHolderEmpty = this.state.stakeholders.some((item: GroupSettingStakeholders) => item.person.value === '');
    const isAnyStakeHolderNotDisabled = this.state.stakeholders.some((item: GroupSettingStakeholders) => !item.person.config.disabled);
    return this.props.disabled || isNameEmpty || isAnyStakeHolderEmpty || isAnyStakeHolderNotDisabled;
  }

  componentDidUpdate() {
    if (this.props.groupId !== this.state.groupId) {
      this.setState({
        groupId: this.props.groupId,
        name: this.props.name,
        stakeholders: this.props.stakeholders
      });
    }
  }

  addStakeholder = () => {
    this.setState({
      stakeholders: this.state.stakeholders.concat(getStakeholders(false)),
      userIdCheckStatus: UserIdCheckStatus.Checking,
      nowCheckUserId: undefined
    });
  };

  removeStakeholder = (index: number) => {
    this.setState({
      stakeholders: this.state.stakeholders.filter((_, pos) => pos !== index),
      userIdCheckStatus: UserIdCheckStatus.Checking,
      nowCheckUserId: undefined
    });
  };

  onNameChange = (value: string) => {
    this.setState({
      name: { ...this.state.name, value }
    });
  };

  onStakeHoldersIdChange = (value: string, index: number) => {
    const stakeholders = this.state.stakeholders.slice();
    stakeholders[index] = {
      ...stakeholders[index],
      person: {
        ...stakeholders[index].person,
        value
      }
    };
    this.setState({
      stakeholders
    });
  };

  onRoleChange = (item: OptionItem<number>, index: number) => {
    const stakeholders = this.state.stakeholders.slice();
    stakeholders[index] = {
      ...stakeholders[index],
      role: {
        ...stakeholders[index].role,
        selected: item.id
      }
    };
    this.setState({
      stakeholders
    });
  };

  onSubmit = () => {
    const data: GroupSettingData = {
      id: '',
      name: this.state.name.value,
      stakeholders: this.state.stakeholders.map(item => item.person.value),
      managers: this.state.stakeholders.filter(item => item.role.selected === GroupRole.Manager).map(item => item.person.value)
    };

    const submitAction = this.props.groupId
      ? GroupService.updateGroup$({
          ...data,
          id: this.props.groupId
        })
      : GroupService.createGroup$({
          ...data
        });

    submitAction.then(() => {
      this.setState({ submitted: true });
    });
  };

  onCheckUserId(userId: string) {
    if (this.state.stakeholders.filter(stakeholder => stakeholder.person.value === userId).length > 1) {
      this.setState({
        nowCheckUserId: userId,
        userIdCheckStatus: UserIdCheckStatus.Duplicate
      });
      return;
    }
    UserService.getUserById$(userId).then(data => {
      this.setState({
        nowCheckUserId: userId,
        userIdCheckStatus: data ? UserIdCheckStatus.Checking : UserIdCheckStatus.NotFound,
        stakeholders: this.state.stakeholders.map(stakeholder => {
          return stakeholder.person.value === userId
            ? {
                ...stakeholder,
                person: {
                  ...stakeholder.person,
                  label: `${this.props.t('Group.Field.MemberId')}${data ? ' - ' + data.name : ''}`,
                  config: {
                    ...stakeholder.person.config,
                    disabled: !!data
                  }
                }
              }
            : {
                ...stakeholder
              };
        })
      });
    });
  }

  render() {
    return (
      <ul className="row">
        {this.state.submitted ? <Redirect to="/user" /> : null}
        <li className="col-12">
          <div className="row">
            <div className="col-12 col-md-8">
              <Input {...this.state.name} change={this.onNameChange}></Input>
            </div>
          </div>
        </li>
        <li className="w-100"></li>
        {this.state.stakeholders.map((stakeholder, index) => {
          return (
            <li className="col-12" key={index}>
              <div className="row align-items-center">
                <div className="col-6 col-md-8">
                  <div className="row mb-3">
                    <div className="col w-100">
                      <Input noMargin={true} {...stakeholder.person} change={value => this.onStakeHoldersIdChange(value, index)}></Input>
                      {!stakeholder.person.config.disabled && this.state.nowCheckUserId === stakeholder.person.value ? (
                        this.state.userIdCheckStatus === UserIdCheckStatus.Checking ? (
                          <small className="text-success">{this.props.t('Group.Message.Checking')}</small>
                        ) : this.state.userIdCheckStatus === UserIdCheckStatus.Duplicate ? (
                          <small className="text-danger">{this.props.t('Group.Message.Duplicate')}</small>
                        ) : (
                          <small className="text-danger">{this.props.t('Group.Message.NotFoundUserID')}</small>
                        )
                      ) : null}
                    </div>
                    {stakeholder.person.config.disabled || !stakeholder.person.value ? null : (
                      <h4
                        className="col-auto mt-1 mb-0 d-flex align-items-center"
                        onClick={() => this.onCheckUserId(stakeholder.person.value)}
                      >
                        <i className="far fa-question-circle yur-cursor-point"></i>
                      </h4>
                    )}
                  </div>
                </div>
                <div className="GroupSettingForm__RoleDropdown col-4 col-sm-auto col-md-auto mb-3">
                  <Dropdown {...stakeholder.role} change={item => this.onRoleChange(item, index)}></Dropdown>
                </div>
                {index === 0 ? (
                  <h3 className="col-2 col-sm-auto mt-4">
                    <i className="fas fa-plus yur-cursor-point" onClick={this.addStakeholder}></i>
                  </h3>
                ) : (
                  <h3 className="col-2 col-sm-auto">
                    <i className="fas fa-minus yur-cursor-point" onClick={() => this.removeStakeholder(index)}></i>
                  </h3>
                )}
              </div>
            </li>
          );
        })}
        <li className="col-12 text-right mt-3">
          <button disabled={this.isDisabledSubmit} type="button" className="btn btn-primary" onClick={this.onSubmit}>
            {this.props.t('General.Button.Submit')}
          </button>
        </li>
      </ul>
    );
  }
}

export default withTranslation()(GroupSettingForm);
