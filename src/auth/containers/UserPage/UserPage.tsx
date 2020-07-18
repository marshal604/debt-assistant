import React, { Component } from 'react';
import Card from 'src/shared/layout/Card/Card';
import UserInfo from 'src/auth/components/UserInfo/UserInfo';
import GroupOverview from 'src/group/components/GroupOverview/GroupOverview';
import { GroupOverviewProps } from 'src/group/components/GroupOverview/GroupOverview.model';
import './UserPage.scss';
class UserPage extends Component {
  render() {
    const groupOverviewList: GroupOverviewProps[] = [
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
        id: 'daswgeqeaead',
        name: '測試二',
        balance: -13000,
        stakeholders: ['user1', 'user2', 'user3'],
        managers: ['user1', 'user2', 'user3']
      }
    ];
    return (
      <React.Fragment>
        <div className="position-relative h-100 d-flex justify-content-center align-items-center">
          <div className="row col-12 justify-content-center">
            <div className="col-12 col-md-8">
              <h4>個人資訊</h4>
              <Card classes={['mt-3']} body={<UserInfo />}></Card>
            </div>
            <div className="w-100"></div>
            <div className="mt-3 col-12 col-md-8 Group">
              <h4>群組概況</h4>
              <div className="row Group__Container">
                {groupOverviewList.map(item => (
                  <div key={item.id} className="col-12 col-md-6 col-xl-4 Group__Container__Item">
                    <GroupOverview {...item}></GroupOverview>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserPage;
