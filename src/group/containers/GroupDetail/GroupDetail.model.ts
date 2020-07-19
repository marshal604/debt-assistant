export interface GroupDetailPageState {
  items: DebtItem[];
}

export interface DebtItem {
  id: string;
  title: string;
  groupId: string;
  creditorId: string;
  debtorId: string;
  status: DebtStatus;
  currency: number;
}

export enum DebtStatus {
  Pending = 1,
  PayOff = 2
}
