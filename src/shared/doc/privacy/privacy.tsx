import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PrivacyTw from './PrivacyTw/PrivacyTw';
import PrivacyEn from './PrivacyEn/PrivacyEn';
import Page from 'src/shared/layout/Page/Page';
import Card from '../../layout/Card/Card';
import { PrivacyState } from './Privacy.model';
import { Lang } from 'src/shared/models/enum';

class Privacy extends Component<RouteComponentProps<{ lang: string }>, PrivacyState> {
  state = {
    lang: Lang.Tw
  };
  componentDidMount() {
    const lang = this.props.match.params.lang === 'en' ? Lang.En : Lang.Tw;
    this.setState({
      lang
    });
  }
  render() {
    return (
      <Page central={true}>
        <Card body={this.state.lang === Lang.En ? <PrivacyEn /> : <PrivacyTw />}></Card>
      </Page>
    );
  }
}

export default Privacy;
