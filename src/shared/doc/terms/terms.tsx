import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import TermsEn from './terms-en/terms-en';
import TermsTw from './terms-tw/terms-tw';
import Page from 'src/shared/layout/Page/Page';
import Card from '../../layout/Card/Card';
import { TermsState } from './terms.model';
import { Lang } from 'src/shared/models/enum';

class Terms extends Component<RouteComponentProps<{ lang: string }>, TermsState> {
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
        <Card body={this.state.lang === Lang.En ? <TermsEn /> : <TermsTw />}></Card>
      </Page>
    );
  }
}

export default Terms;
