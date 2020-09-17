import { GroupDetailItem } from 'src/group/model/Group.model';
import { OptionItem } from 'src/shared/forms/forms.model';

export interface GroupDetailPageState {
  items: GroupDetailItem[];
  redirectToEditPage: boolean;
  options: OptionItem<DebtBehaviorStatus>[];
}

export enum DebtBehaviorStatus {
  Edit = 1,
  DunningNotice,
  MarkPayOff,
  MarkPending
}
