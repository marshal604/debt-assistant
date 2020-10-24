import { WithTranslation } from 'react-i18next';

import { InputProps, InputType } from 'src/shared/forms/Input/Input.model';
import { DropdownProps } from 'src/shared/forms/Dropdown/Dropdown.model';
import { OptionItem } from 'src/shared/forms/forms.model';
import { GroupRole } from 'src/group/model/Group.model';
import i18next from 'i18next';
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
  groupId?: string;
  nowCheckUserId?: string;
  userIdCheckStatus?: UserIdCheckStatus;
};

export enum UserIdCheckStatus {
  Checking = 1,
  NotFound,
  Duplicate
}

export interface GroupSettingStakeholders {
  person: InputProps<string>;
  role: DropdownProps;
}

export function getRoleOptions(): OptionItem<number>[] {
  return [
    {
      id: GroupRole.Manager,
      name: i18next.t('Group.Enum.GroupRole.1')
    },
    {
      id: GroupRole.Member,
      name: i18next.t('Group.Enum.GroupRole.2')
    }
  ];
}

export function getDefaultGroupSettingForm(info?: StakeholderInfo): GroupSettingFormData {
  return {
    name: {
      inputType: InputType.Input,
      config: {
        placeholder: i18next.t('Group.Field.PleaseTypingGroupName'),
        type: 'text'
      },
      value: '',
      label: i18next.t('Group.Field.GroupName')
    },
    stakeholders: [getStakeholders(true, info)]
  };
}

export function getStakeholders(useLabel = true, info?: StakeholderInfo, disabled = false): GroupSettingStakeholders {
  return {
    person: {
      inputType: InputType.Input,
      config: {
        placeholder: i18next.t('Group.Field.PleaseTypingGroupId'),
        type: 'text',
        disabled
      },
      value: info?.id || '',
      label: useLabel ? `${i18next.t('Group.Field.MemberId')} ${info?.name ? ' - ' + info.name : ''}` : ''
    },
    role: {
      label: useLabel ? i18next.t('Group.Field.Position') : '',
      options: getRoleOptions(),
      selected: info?.role || GroupRole.Member
    }
  };
}

export interface StakeholderInfo {
  id: string;
  name: string;
  role: GroupRole;
}
