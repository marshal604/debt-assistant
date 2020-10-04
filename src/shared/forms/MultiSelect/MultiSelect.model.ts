import { ReactNode } from 'react';
import { OptionItem } from 'src/shared/forms/forms.model';

export interface MultiSelectProps<T = any> {
  options: OptionItem<T>[];
  change?: (selected: T[]) => void;
  label?: string;
  selected?: T[];
  customized?: boolean;
  customBody?: ReactNode;
}

export interface MultiSelectState {
  opened: boolean;
}
