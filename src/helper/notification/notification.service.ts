import { getBrowser } from 'src/shared/utils/browser';
import Firebase from 'src/shared/utils/firebase-register';
class NotificationService {
  private tableName = 'deviceToken';

  getDeviceTokens$(): Promise<string[]> {
    return Firebase.db
      .collection(this.tableName)
      .get()
      .then(data => {
        const result: string[] = [];
        data.forEach(item => {
          const { token } = item.data();
          result.push(token);
        });
        return result;
      });
  }

  getDeviceTokensByUser$(userId: string): Promise<string[]> {
    return Firebase.db
      .collection(this.tableName)
      .where('userId', '==', userId)
      .get()
      .then(data => {
        const result: string[] = [];
        data.forEach(item => {
          const { token } = item.data();
          result.push(token);
        });
        return result;
      });
  }

  addDeviceToken$(id: string, token: string): Promise<void> {
    return Firebase.db
      .collection(this.tableName)
      .doc(token)
      .set({ token, userId: id, createTime: new Date().toString(), browser: getBrowser() }, { merge: true });
  }

  deleteDeviceToken$(token: string): Promise<void> {
    return Firebase.db
      .collection(this.tableName)
      .doc(token)
      .delete();
  }
}

export default new NotificationService();
