import { GroupDetailItem } from 'src/group/model/Group.model';

export interface GroupDetailPageState {
  items: GroupDetailItem[];
  redirectToEditPage: boolean;
}
