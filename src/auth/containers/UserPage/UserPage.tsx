import React, { Component } from 'react';
import Card from 'src/shared/layout/Card/Card';
import UserInfo from 'src/auth/components/UserInfo/UserInfo';
import Page from 'src/shared/layout/Page/Page';
import GroupOverview from 'src/group/components/GroupOverview/GroupOverview';
import UserService from 'src/auth/services/user/user.service';
import { AuthInfo } from 'src/shared/models/user';
import GroupService from 'src/group/services/group/group.service';
import { UserPageState } from './UserPage.model';
import Firebase from 'src/shared/utils/firebase-register';
import NotificationService from 'src/helper/notification/notification.service';
class UserPage extends Component<{}, UserPageState> {
  state = {
    groupOverviewList: [],
    hasNotifyPermission: Notification.permission === 'granted'
  };
  lend = 0;
  debt = 0;
  componentDidMount() {
    GroupService.getOwnerGroupList$(UserService.getUserId()).then(async data => {
      const debtList = await Promise.all(data.map(item => GroupService.getGroupDebtCurrency(UserService.getUserId(), item.id)));
      const lendList = await Promise.all(data.map(item => GroupService.getGroupLendCurrency(UserService.getUserId(), item.id)));
      this.lend = lendList.reduce((pre, cur) => pre + cur, 0);
      this.debt = debtList.reduce((pre, cur) => pre + cur, 0);
      this.setState({
        groupOverviewList: data.map((item, index) => ({
          id: item.id,
          name: item.name,
          stakeholders: item.stakeholders,
          managers: item.managers,
          debt: debtList[index],
          lend: lendList[index]
        }))
      });
    });

    if (Notification.permission === 'granted' && UserService.getUserId()) {
      Firebase.serviceWorkerRegistration$
        .then(() => Firebase.getToken())
        .then(token => NotificationService.addDeviceToken$(UserService.getUserId(), token))
        .catch(err => {
          console.log('add device token error', err);
        });
    }
  }

  render() {
    const userInfo: AuthInfo = UserService.getUser();
    return (
      <Page central={true}>
        <h4>個人資訊</h4>
        <Card classes={['mt-3']}>
          <UserInfo
            id={userInfo?.id}
            name={userInfo?.name}
            debt={this.debt}
            lend={this.lend}
            hasNotifyPermission={this.state.hasNotifyPermission}
            permissionChange={checked => this.permissionChange(checked)}
            changeName={name => this.changeName(name)}
          />
        </Card>
        <div className="w-100"></div>
        <GroupOverview items={this.state.groupOverviewList}></GroupOverview>
      </Page>
    );
  }

  permissionChange(checked: boolean) {
    const userId = UserService.getUserId();
    Promise.resolve()
      .then(() => {
        if (checked && Notification.permission !== 'granted') {
          return Notification.requestPermission().then(permission => {
            return permission === 'granted' ? Firebase.getToken().then(token => NotificationService.addDeviceToken$(userId, token)) : null;
          });
        } else {
          return Firebase.getToken().then(token => {
            return checked ? NotificationService.addDeviceToken$(userId, token) : NotificationService.deleteDeviceToken$(token);
          });
        }
      })
      .then(() => {
        this.setState({
          hasNotifyPermission: Notification.permission === 'granted' ? checked : false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeName(name: string) {
    UserService.updateUserName$(UserService.getUserId(), name).then(() => {
      UserService.setUser({
        ...UserService.getUser(),
        name
      });
      this.setState({});
    });
  }
}

export default UserPage;
