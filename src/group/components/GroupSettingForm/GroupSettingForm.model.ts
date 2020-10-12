import { WithTranslation } from 'react-i18next';

import { InputProps, InputType } from 'src/shared/forms/Input/Input.model';
import { DropdownProps } from 'src/shared/forms/Dropdown/Dropdown.model';
import { OptionItem } from 'src/shared/forms/forms.model';
import { GroupRole } from 'src/group/model/Group.model';

export interface GroupSettingData {
  id: string;
  name: string;
  stakeholders: string[];
  managers: string[];
}

export interface GroupSettingFormData {
  name: InputProps<string>;
  stakeholders: Array<GroupSettingStakeholders>;
  disabled?: boolean;
}

export interface GroupSettingFormProps extends WithTranslation {
  groupId: string;
  name: InputProps<string>;
  stakeholders: Array<GroupSettingStakeholders>;
  disabled?: boolean;
}

export type GroupSettingFormState = {
  name: InputProps<string>;
  stakeholders: Array<GroupSettingStakeholders>;
  submitted: boolean;
};

export interface GroupSettingStakeholders {
  person: InputProps<string>;
  role: DropdownProps;
}

export function getRoleOptions(): OptionItem<number>[] {
  return [
    {
      id: GroupRole.Manager,
      name: '管理員'
    },
    {
      id: GroupRole.Member,
      name: '一般成員'
    }
  ];
}

export function getDefaultGroupSettingForm(info?: StakeholderInfo): GroupSettingFormData {
  return {
    name: {
      inputType: InputType.Input,
      config: {
        placeholder: '請輸入群組名稱',
        type: 'text'
      },
      value: '',
      label: '名稱'
    },
    stakeholders: [getStakeholders(true, info)]
  };
}

export function getStakeholders(useLabel = true, info?: StakeholderInfo): GroupSettingStakeholders {
  return {
    person: {
      inputType: InputType.Input,
      config: {
        placeholder: '請輸入成員ID',
        type: 'text'
      },
      value: info?.id || '',
      label: useLabel ? '成員ID' : ''
    },
    role: {
      label: useLabel ? '職位' : '',
      options: getRoleOptions(),
      selected: info?.role || GroupRole.Member
    }
  };
}

export interface StakeholderInfo {
  id: string;
  role: GroupRole;
}
