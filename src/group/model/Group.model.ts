export enum GroupRole {
  Manager = 1,
  Member = 2
}

export interface GroupItem {
  id: string;
  name: string;
  stakeholders: string[];
  managers: string[];
}

export interface GroupDetailItem {
  id: string;
  title: string;
  currency: number;
  debtorIds: string[];
  creditorId: string;
  status: DebtStatus;
  createTime: string;
  deadlineTime: string;
  completedTime?: string;
}

export enum DebtStatus {
  Pending = 1,
  PayOff = 2
}

export interface GroupTemplateItem {
  id: string;
  templateTitle: string;
  detailTitle: string;
  currency: number;
  debtorIds: string[];
  creditorId: string;
}
