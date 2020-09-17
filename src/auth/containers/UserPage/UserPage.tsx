import React, { Component } from 'react';
import Card from 'src/shared/layout/Card/Card';
import UserInfo from 'src/auth/components/UserInfo/UserInfo';
import Page from 'src/shared/layout/Page/Page';
import GroupOverview from 'src/group/components/GroupOverview/GroupOverview';
import UserService from 'src/auth/services/user/user.service';
import { AuthInfo } from 'src/shared/models/user';
import GroupService from 'src/group/services/group/group.service';
import { UserPageState } from './UserPage.model';
class UserPage extends Component<{}, UserPageState> {
  state = {
    groupOverviewList: []
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
  }

  render() {
    const userInfo: AuthInfo = UserService.getUser();
    return (
      <Page central={true}>
        <h4>個人資訊</h4>
        <Card classes={['mt-3']}>
          <UserInfo id={userInfo?.id} name={userInfo?.name} debt={this.debt} lend={this.lend} />
        </Card>
        <div className="w-100"></div>
        <GroupOverview items={this.state.groupOverviewList}></GroupOverview>
      </Page>
    );
  }
}

export default UserPage;
