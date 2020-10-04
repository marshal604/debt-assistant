import { InputProps } from 'src/shared/forms/Input/Input.model';
import { DropdownProps } from 'src/shared/forms/Dropdown/Dropdown.model';
import { MultiSelectProps } from 'src/shared/forms/MultiSelect/MultiSelect.model';

export interface GroupDetailSettingFormData {
  title: InputProps<string>;
  debtorId: DropdownProps<string>;
  creditorId: DropdownProps<string>;
  currency: InputProps<number>;
  deadline: InputProps<string>;
  disabled?: boolean;
}

export interface GroupDetailSettingFormProps {
  groupId: string;
  groupDetailId: string;
  title: string;
  debtorIds: string[];
  creditorId: string;
  currency: number;
  deadline: string;
  disabled?: boolean;
}

export type GroupDetailSettingFormState = {
  title: InputProps<string>;
  debtorIds: MultiSelectProps<string>;
  creditorId: DropdownProps<string>;
  currency: InputProps<number>;
  deadline: InputProps<string>;
  submitted: boolean;
};
