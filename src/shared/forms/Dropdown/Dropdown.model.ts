import { OptionItem } from 'src/shared/forms/forms.model';

export interface DropdownProps<T = any> {
  options: OptionItem<T>[];
  change?: (option: OptionItem<T>) => void;
  label?: string;
  selected?: T;
}

export interface DropdownState {
  opened: boolean;
}
