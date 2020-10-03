import { GroupOverviewItemProps } from 'src/group/components/GroupOverview/GroupOverviewItem/GroupOverviewItem.model';
export interface UserPageState {
  groupOverviewList: GroupOverviewItemProps[];
  hasNotifyPermission: boolean;
}
