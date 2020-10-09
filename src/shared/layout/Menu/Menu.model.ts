export interface MenuProps {
  opened?: boolean;
  brandUrl?: string;
  list: MenuItem[];
}

export interface MenuItem {
  title: string;
  link: string;
  iconCls?: string;
  divider?: boolean;
}
