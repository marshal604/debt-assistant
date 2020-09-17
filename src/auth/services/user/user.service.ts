import { AuthInfo } from 'src/shared/models/user';
import Firebase from 'src/shared/utils/firebase-register';
import { OptionItem } from 'src/shared/forms/forms.model';

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
    const promiseList = userIdList.map(id => this.getUser$(id));
    return Promise.all(promiseList).then(res => {
      const groupUsers = res.map(item => ({
        id: item.id,
        name: item.name
      }));
      this.groupUsers = groupUsers;
      return groupUsers;
    });
  }

  addUser$(req: AuthInfo): Promise<void> {
    return Firebase.db
      .collection(this.tableName)
      .doc(req.id)
      .set(
        {
          id: req.id,
          email: req.email,
          name: req.name
        },
        { merge: true }
      );
  }

  updateUserName$(id: string, name: string): Promise<void> {
    return Firebase.db
      .collection(this.tableName)
      .doc(id)
      .update({
        name
      });
  }

  getUser$(id: string): Promise<AuthInfo> {
    return Firebase.db
      .collection(this.tableName)
      .doc(id)
      .get()
      .then(res => res.data() as AuthInfo);
  }
}

export default new UserService();
