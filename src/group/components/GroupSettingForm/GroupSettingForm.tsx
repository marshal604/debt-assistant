import React, { Component } from 'react';

import Input from 'src/shared/forms/Input/Input';
import Dropdown from 'src/shared/forms/Dropdown/Dropdown';
import {
  GroupSettingFormProps,
  getStakeholders,
  GroupSettingStakeholders,
  GroupSettingFormState,
  GroupSettingData
} from './GroupSettingForm.model';
import { OptionItem } from 'src/shared/forms/forms.model';
import { Redirect } from 'react-router-dom';
import GroupService from 'src/group/services/group/group.service';
import { GroupRole } from 'src/group/model/Group.model';

class GroupSettingForm extends Component<GroupSettingFormProps, GroupSettingFormState> {
  state = {
    name: this.props.name,
    stakeholders: this.props.stakeholders,
    submitted: false
  };

  get isDisabledSubmit(): boolean {
    const isNameEmpty = this.state.name.value === '';
    const isAnyStakeHolderEmpty = this.state.stakeholders.some((item: GroupSettingStakeholders) => item.person.value === '');
    return this.props.disabled || isNameEmpty || isAnyStakeHolderEmpty;
  }

  addStakeholder = () => {
    this.setState({
      stakeholders: this.state.stakeholders.concat(getStakeholders(false))
    });
  };

  removeStakeholder = (index: number) => {
    this.setState({
      stakeholders: this.state.stakeholders.filter((_, pos) => pos !== index)
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
      this.setState({
        submitted: true
      });
    });
  };

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
                <div className="col-5 col-sm-auto col-md-8">
                  <Input {...stakeholder.person} change={value => this.onStakeHoldersIdChange(value, index)}></Input>
                </div>
                <div className="col-5 col-sm-auto col-md-auto mb-3">
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
            送出
          </button>
        </li>
      </ul>
    );
  }
}

export default GroupSettingForm;
