import Firebase from 'src/shared/utils/firebase-register';
import { GroupItem, GroupDetailItem, DebtStatus, GroupTemplateItem } from 'src/group/model/Group.model';
export class GroupService {
  createGroup$(item: GroupItem): Promise<void> {
    return Firebase.db
      .collection('group')
      .add(item)
      .then(ref => ref.set({ id: ref.id }, { merge: true }));
  }

  updateGroup$(item: GroupItem): Promise<void> {
    return Firebase.db
      .collection('group')
      .doc(item.id)
      .set(item, { merge: true });
  }

  deleteGroup$(groupId: string): Promise<void> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .delete();
  }

  getOwnerGroupList$(userId: string): Promise<GroupItem[]> {
    return Firebase.db
      .collection('group')
      .where('stakeholders', 'array-contains', userId)
      .get()
      .then(data => {
        const result: GroupItem[] = [];
        data.forEach(item => {
          const { id, name, stakeholders, managers } = item.data();
          result.push({
            id,
            name,
            stakeholders,
            managers
          });
        });
        return result;
      });
  }

  getGroupLendCurrency(userId: string, groupId: string): Promise<number> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupDetail')
      .where('status', '==', DebtStatus.Pending)
      .where('creditorId', '==', userId)
      .get()
      .then(res => {
        let result = 0;
        res.forEach(item => {
          const { currency } = item.data();
          result += +currency;
        });
        return result;
      });
  }

  getGroupDebtCurrency(userId: string, groupId: string): Promise<number> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupDetail')
      .where('status', '==', DebtStatus.Pending)
      .where('debtorIds', 'array-contains', userId)
      .get()
      .then(res => {
        let result = 0;
        res.forEach(item => {
          const { currency, debtorIds } = item.data();
          result += +(currency / debtorIds.length);
        });
        return -1 * result;
      });
  }

  getGroup$(groupId: string): Promise<GroupItem> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .get()
      .then(res => res.data() as GroupItem);
  }

  getGroupDetailList$(groupId: string): Promise<GroupDetailItem[]> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupDetail')
      .orderBy('status', 'asc')
      .orderBy('createTime', 'desc')
      .get()
      .then(data => {
        const result: GroupDetailItem[] = [];
        data.forEach(item => {
          const { id, title, currency, debtorIds, creditorId, status, createTime, deadlineTime, completedTime } = item.data();
          result.push({
            id,
            title,
            currency,
            debtorIds,
            creditorId,
            status,
            createTime,
            deadlineTime,
            completedTime
          });
        });
        return result;
      });
  }

  getGroupDetail$(groupId: string, groupDetailId: string): Promise<GroupDetailItem> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupDetail')
      .doc(groupDetailId)
      .get()
      .then(res => res.data() as GroupDetailItem);
  }

  createGroupDetail$(groupId: string, detail: GroupDetailItem): Promise<void> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupDetail')
      .add(detail)
      .then(ref => ref.set({ id: ref.id }, { merge: true }));
  }

  batchCreateGroupDetail$(groupId: string, details: GroupDetailItem[]): Promise<void> {
    return Promise.all(details.map(detail => this.createGroupDetail$(groupId, detail))).then();
  }

  updateGroupDetail$(groupId: string, detail: GroupDetailItem): Promise<void> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupDetail')
      .doc(detail.id)
      .set(detail, { merge: true });
  }

  updateGroupDetailStatus$(groupId: string, groupDetailId: string, status: DebtStatus): Promise<void> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupDetail')
      .doc(groupDetailId)
      .set({ status }, { merge: true });
  }

  deleteGroupDetail$(groupId: string, groupDetailId: string): Promise<void> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupDetail')
      .doc(groupDetailId)
      .delete();
  }

  getGroupTemplate$(groupId: string): Promise<GroupTemplateItem[]> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupTemplate')
      .get()
      .then(data => {
        const result: GroupTemplateItem[] = [];
        data.forEach(item => {
          const { id, templateTitle, detailTitle, currency, debtorId, creditorId } = item.data();
          result.push({
            id,
            templateTitle,
            detailTitle,
            currency,
            debtorIds: debtorId,
            creditorId
          });
        });
        return result;
      });
  }

  createGroupTemplate$(groupId: string, template: GroupTemplateItem): Promise<void> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupTemplate')
      .add(template)
      .then(ref => ref.set({ id: ref.id }, { merge: true }));
  }

  deleteGroupTemplate$(groupId: string, templateId: string): Promise<void> {
    return Firebase.db
      .collection('group')
      .doc(groupId)
      .collection('groupTemplate')
      .doc(templateId)
      .delete();
  }

  batchDeleteGroupTemplate$(groupId: string, templateIds: string[]): Promise<void> {
    return Promise.all(templateIds.map(id => this.deleteGroupTemplate$(groupId, id))).then();
  }
}

export default new GroupService();
