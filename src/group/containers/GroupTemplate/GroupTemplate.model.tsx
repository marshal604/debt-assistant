import { InputProps } from 'src/shared/forms/Input/Input.model';

export interface GroupTemplateState {
  redirectToGroupTemplate: boolean;
  items: GroupTemplateFormItem[];
  selectedIds: string[];
}
export interface GroupTemplateFormItem {
  id: string;
  templateTitle: string;
  currency: InputProps<number>;
  detailTitle: InputProps<string>;
  checkbox: InputProps<boolean>;
  debtorId: string;
  creditorId: string;
}
