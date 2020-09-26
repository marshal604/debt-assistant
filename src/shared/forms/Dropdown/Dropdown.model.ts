import { ReactNode } from 'react';
import { OptionItem } from 'src/shared/forms/forms.model';

export interface DropdownProps<T = any> {
  options: OptionItem<T>[];
  change?: (option: OptionItem<T>) => void;
  label?: string;
  selected?: T;
  customized?: boolean;
  customBody?: ReactNode;
}

export interface DropdownState {
  opened: boolean;
}
