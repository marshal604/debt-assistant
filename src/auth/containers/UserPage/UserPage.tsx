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
  componentDidMount() {
    GroupService.getOwnerGroupList$(UserService.getUserId()).then(data => {
      this.setState({
        groupOverviewList: data.map((item, index) => ({
          id: item.id,
          name: item.name,
          stakeholders: item.stakeholders,
          managers: item.managers,
          balance: index * -1_000
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
          <UserInfo id={userInfo?.id} name={userInfo?.name} currency={-1000} />
        </Card>
        <div className="w-100"></div>
        <GroupOverview items={this.state.groupOverviewList}></GroupOverview>
      </Page>
    );
  }
}

export default UserPage;
