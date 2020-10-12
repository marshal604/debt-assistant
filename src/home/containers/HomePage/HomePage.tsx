import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withTranslation, WithTranslation } from 'react-i18next';

import Page from 'src/shared/layout/Page/Page';
import HomePageLogo from 'src/assets/logo/homepage-logo.png';
import './HomePage.scss';
import AuthContext from 'src/context/auth.context';
class HomePage extends Component<WithTranslation> {
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
            <h2>{this.props.t('Home.Field.Title')}</h2>
            <Link to={this.context.authorized ? '/user' : '/login'}>
              <button className="btn btn-outline-primary mt-4 btn-lg">{this.props.t('Home.Button.StartUse')}</button>
            </Link>
            <p className="mt-4">
              {this.props.t('Home.Message.Description1')}
              <br />
              {this.props.t('Home.Message.Description2')}
            </p>
          </div>
        </div>
      </Page>
    );
  }
}

export default withTranslation()(HomePage);
