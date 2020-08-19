import { AuthInfo } from 'src/shared/models/user';
import Firebase from 'src/shared/utils/firebase-register';

class UserService {
  private user: AuthInfo = {
    id: '',
    name: '',
    email: ''
  };
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

  addUser$(req: AuthInfo): Promise<void> {
    console.log('table name', this.tableName);
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
}

export default new UserService();
