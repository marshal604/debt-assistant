import React, { Component } from 'react';
import Card from 'src/shared/layout/Card/Card';

import Page from 'src/shared/layout/Page/Page';

class LoginPage extends Component {
  render() {
    return (
      <Page central={true}>
        <Card
          header={<div className="text-center">選擇你要登入的帳號</div>}
          body={
            <div className="d-flex flex-column">
              <button type="button" className="btn btn-primary">
                登入方式一
              </button>
              <button type="button" className="btn btn-secondary mt-3">
                登入方式二
              </button>
            </div>
          }
        ></Card>
      </Page>
    );
  }
}

export default LoginPage;
