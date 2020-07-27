import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Page from 'src/shared/layout/Page/Page';
import HomePageLogo from 'src/assets/logo/homepage-logo.png';
import './HomePage.scss';
import AuthContext from 'src/context/auth.context';
class HomePage extends Component {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  render() {
    return (
      <Page central={true}>
        <div className="HomePage row justify-content-center">
          <div className="col-auto">
            <img src={HomePageLogo} alt="homepage logo" />
          </div>
          <div className="w-100 mt-4"></div>
          <div className="col-auto text-center">
            <h2>簡單易懂的債務管理系統</h2>
            <Link to={this.context.authorized ? '/user' : '/login'}>
              <button className="btn btn-outline-primary mt-4 btn-lg">點我開始使用</button>
            </Link>
            <p className="mt-4">
              債務小幫手致力於讓債務的管理方式更自動化，
              <br />
              利用債務小紙條與個人概況，快速暸解目前的信用狀況
            </p>
          </div>
        </div>
      </Page>
    );
  }
}

export default HomePage;
