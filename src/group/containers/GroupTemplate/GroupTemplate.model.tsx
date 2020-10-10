import { InputProps } from 'src/shared/forms/Input/Input.model';

export interface GroupTemplateState {
  redirectToGroup: boolean;
  items: GroupTemplateFormItem[];
  selectedIds: string[];
}
export interface GroupTemplateFormItem {
  id: string;
  templateTitle: string;
  currency: InputProps<number>;
  detailTitle: InputProps<string>;
  checkbox: InputProps<boolean>;
  debtorIds: string[];
  creditorId: string;
}
