import { OptionItem } from 'src/shared/forms/forms.model';

export interface DropdownProps {
  options: OptionItem<number>[];
  change: (option: OptionItem<number>) => void;
  selected?: OptionItem<number>;
}

export interface DropdownState {
  opened: boolean;
}
