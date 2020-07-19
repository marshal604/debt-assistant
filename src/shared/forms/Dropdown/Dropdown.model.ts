import { OptionItem } from 'src/shared/forms/forms.model';

export interface DropdownProps {
  options: OptionItem<number>[];
  change: (option: OptionItem<number>) => void;
  label?: string;
  selected?: number;
}

export interface DropdownState {
  opened: boolean;
}
