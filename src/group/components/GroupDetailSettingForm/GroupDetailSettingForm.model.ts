import { InputProps } from 'src/shared/forms/Input/Input.model';
import { DropdownProps } from 'src/shared/forms/Dropdown/Dropdown.model';

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
  debtorId: string;
  creditorId: string;
  currency: number;
  deadline: string;
  disabled?: boolean;
}

export type GroupDetailSettingFormState = {
  title: InputProps<string>;
  debtorId: DropdownProps<string>;
  creditorId: DropdownProps<string>;
  currency: InputProps<number>;
  deadline: InputProps<string>;
  submitted: boolean;
};
