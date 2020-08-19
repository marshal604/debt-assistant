import React, { Component } from 'react';
import Card from 'src/shared/layout/Card/Card';
import UserInfo from 'src/auth/components/UserInfo/UserInfo';
import { GroupOverviewItemProps } from 'src/group/components/GroupOverview/GroupOverviewItem/GroupOverviewItem.model';
import Page from 'src/shared/layout/Page/Page';
import GroupOverview from 'src/group/components/GroupOverview/GroupOverview';
import UserService from 'src/auth/services/user/user.service';
import { AuthInfo } from 'src/shared/models/user';
class UserPage extends Component {
  userInfo: AuthInfo = UserService.getUser();
  render() {
    const overview: GroupOverviewItemProps[] = [
      {
        id: '1oamfia2fjosmdl',
        name: '測試一',
        balance: -3000,
        stakeholders: ['user1', 'user2', 'user3'],
        managers: ['user1', 'user2', 'user3']
      },
      {
        id: 'daswgeqeaead',
        name: '測試二',
        balance: -13000,
        stakeholders: ['user1', 'user2', 'user3'],
        managers: ['user1', 'user2', 'user3']
      },
      {
        id: 'daswgeqeaeadasd',
        name: '測試三',
        balance: -10000,
        stakeholders: ['user1', 'user2', 'user3'],
        managers: ['user1', 'user2', 'user3']
      }
    ];
    return (
      <Page central={true}>
        <h4>個人資訊</h4>
        <Card classes={['mt-3']}>
          <UserInfo id={this.userInfo?.id} name={this.userInfo?.name} debtStatus={-1000} />
        </Card>
        <div className="w-100"></div>
        <GroupOverview items={overview}></GroupOverview>
      </Page>
    );
  }
}

export default UserPage;
