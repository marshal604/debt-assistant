import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Page from 'src/shared/layout/Page/Page';
import Card from 'src/shared/layout/Card/Card';
import TermsEn from './TermsEn/TermsEn';
import TermsTw from './TermsTw/TermsTw';
import { TermsState } from './Terms.model';
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
        <Card>{this.state.lang === Lang.En ? <TermsEn /> : <TermsTw />}</Card>
      </Page>
    );
  }
}

export default Terms;
