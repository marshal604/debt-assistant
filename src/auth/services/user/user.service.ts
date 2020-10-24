import { AuthInfo } from 'src/shared/models/user';
import Firebase from 'src/shared/utils/firebase-register';
import { OptionItem } from 'src/shared/forms/forms.model';
import HttpClient from 'src/helper/httpClient/httpClient';

class UserService {
  private user: AuthInfo = {
    id: '',
    name: '',
    email: ''
  };
  private groupUsers: OptionItem<string>[] = [];
  private tableName = 'user';

  clearUser() {
    this.user = {
      id: '',
      name: '',
      email: ''
    };
  }

  getUser(): AuthInfo {
    return this.user;
  }

  getUserId(): string {
    return this.user?.id;
  }

  getUserEmail(): string {
    return this.user?.email;
  }

  getUserName(): string {
    return this.user?.name;
  }

  setUser(user: AuthInfo) {
    this.user = user;
  }

  getGroupUsers(): OptionItem<string>[] {
    return this.groupUsers.slice();
  }

  initGroupUsers$(userIdList: string[]): Promise<OptionItem<string>[]> {
    const promiseList = userIdList.map(id => this.getUserById$(id));
    return HttpClient.middle(Promise.all(promiseList)).then(res => {
      const groupUsers = res.map(item => ({
        id: item.id,
        name: item.name
      }));
      this.groupUsers = groupUsers;
      return groupUsers;
    });
  }

  addUser$(req: AuthInfo): Promise<AuthInfo> {
    return HttpClient.middle(
      Firebase.db.collection(this.tableName).add({
        email: req.email,
        name: req.name
      })
    )
      .then(async ref => {
        await ref.set({ id: ref.id }, { merge: true });
        return ref.id;
      })
      .then(id => ({
        id,
        email: req.email,
        name: req.name
      }));
  }

  updateUserName$(id: string, name: string): Promise<void> {
    return HttpClient.middle(
      Firebase.db
        .collection(this.tableName)
        .doc(id)
        .update({
          name
        })
    );
  }

  getUserByEmail$(email: string): Promise<AuthInfo> {
    return HttpClient.middle(
      Firebase.db
        .collection(this.tableName)
        .where('email', '==', email)
        .get()
    ).then(
      res =>
        new Promise((resolve, reject) => {
          res.forEach(user => {
            resolve(user.data() as AuthInfo);
          });
          resolve();
        })
    );
  }

  getUserById$(id: string): Promise<AuthInfo> {
    return HttpClient.middle(
      Firebase.db
        .collection(this.tableName)
        .where('id', '==', id)
        .get()
    ).then(
      res =>
        new Promise((resolve, reject) => {
          res.forEach(user => {
            resolve(user.data() as AuthInfo);
          });
          resolve();
        })
    );
  }

  getGroupUserName(id: string): string {
    return this.groupUsers.find(item => item.id === id)?.name || id;
  }
}

export default new UserService();
