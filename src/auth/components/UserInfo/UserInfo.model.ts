export interface UserInfoProps {
  id: string;
  name: string;
  debt: number;
  lend: number;
  hasNotifyPermission?: boolean;
  permissionChange?: (checked: boolean) => void;
}
