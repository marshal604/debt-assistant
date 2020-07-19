import { InputProps, InputType } from 'src/shared/forms/Input/Input.model';
import { DropdownProps } from 'src/shared/forms/Dropdown/Dropdown.model';
import { OptionItem } from 'src/shared/forms/forms.model';
import { GroupRole } from 'src/group/model/Group.model';

export interface GroupSettingFormProps {
  name: InputProps;
  stakeholders: Array<GroupStakeHolders>;
  disabled?: boolean;
}

export type GroupSettingFormState = GroupSettingFormProps & {
  submitted: boolean;
};

export interface GroupStakeHolders {
  person: InputProps;
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

export function getDefaultGroupSettingForm(): GroupSettingFormProps {
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
    stakeholders: [getStakeholders()]
  };
}

export function getStakeholders(useLabel = true): GroupStakeHolders {
  return {
    person: {
      inputType: InputType.Input,
      config: {
        placeholder: '請輸入成員ID',
        type: 'text'
      },
      value: '',
      label: useLabel ? '成員ID' : ''
    },
    role: {
      label: useLabel ? '職位' : '',
      options: getRoleOptions(),
      change: (option: OptionItem<number>) => {
        console.log(option);
      },
      selected: GroupRole.Member
    }
  };
}
