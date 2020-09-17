import Firebase from 'src/shared/utils/firebase-register';
import { GroupItem, GroupDetailItem, DebtStatus } from 'src/group/model/Group.model';
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

  getGroup$(groupId: string): Promise<GroupItem> {
    console.log('Firebase', Firebase);
    console.log('Firebase.db', Firebase.db);
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
          const { id, title, currency, debtorId, creditorId, status, createTime, deadlineTime, completedTime } = item.data();
          result.push({
            id,
            title,
            currency,
            debtorId,
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
}

export default new GroupService();
